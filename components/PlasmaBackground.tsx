import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.1, 0.0, 0.4];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uSpeed;
uniform float uScale;
uniform vec2 uMouse;
uniform float uOffsetX;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 fragCoord) {
  // Shift coordinate system to the right
  vec2 C = fragCoord;
  C.x -= iResolution.x * uOffsetX;
  
  // Apply mouse distortion
  vec2 mouseOffset = uMouse - fragCoord;
  float mouseDist = length(mouseOffset) / iResolution.y;
  C += mouseOffset * exp(-mouseDist * 2.0) * 0.15;
  
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  float i, d, z, T = iTime * uSpeed;
  vec3 O = vec3(0.0);
  vec3 p, S;
  vec4 col;

  for (vec2 r = iResolution.xy, Q; ++i < 25.; O += col.w/d*col.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;

    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    col = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }

  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}


void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);

  // Smooth gradient mixing to remove contour lines
  float n = (rgb.r + rgb.g + rgb.b) / 3.0; // Intensity
  
  // Smoothly mix between the 3 colors and white based on intensity
  // Base to Mid
  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.5, n));
  // Mid to Highlight
  col = mix(col, uColor3, smoothstep(0.4, 0.8, n));
  // Highlight to White (peaks)
  col = mix(col, vec3(1.0), smoothstep(0.8, 1.2, n));
  
  // Subtle dither to prevent 8-bit banding
  float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
  col += (noise - 0.5) * 0.01;
  
  fragColor = vec4(col, 1.0);
}`;

interface PlasmaBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  offsetX?: number;
  interactive?: boolean;
}

export const PlasmaBackground = ({
  color1 = '#151326', // Darker base
  color2 = '#24006D',
  color3 = '#8B5CF6',
  speed = 0.4,
  scale = 1,
  offsetX = 0.2,
  interactive = true,
}: PlasmaBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerEl = containerRef.current;

    const color1Rgb = hexToRgb(color1);
    const color2Rgb = hexToRgb(color2);
    const color3Rgb = hexToRgb(color3);

    // Detect Safari for performance optimization
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Reduce DPR for better performance (especially on Safari)
    const dpr = isSafari ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

    const renderer = new Renderer({
      webgl: 2,
      alpha: false,
      antialias: false,
      dpr: dpr
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    containerEl.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uColor1: { value: new Float32Array(color1Rgb) },
        uColor2: { value: new Float32Array(color2Rgb) },
        uColor3: { value: new Float32Array(color3Rgb) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uMouse: { value: new Float32Array([0, 0]) },
        uOffsetX: { value: offsetX },
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = renderer.dpr;
      mouseRef.current.targetX = (e.clientX - rect.left) * dpr;
      mouseRef.current.targetY = (rect.height - (e.clientY - rect.top)) * dpr;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const setSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;

      mouseRef.current.x = gl.drawingBufferWidth / 2;
      mouseRef.current.y = gl.drawingBufferHeight / 2;
      mouseRef.current.targetX = mouseRef.current.x;
      mouseRef.current.targetY = mouseRef.current.y;
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(containerEl);
    setSize();

    // IntersectionObserver to pause animation when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(containerEl);

    const t0 = performance.now();

    const loop = (t: number) => {
      // Skip rendering when not visible for better scroll performance
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const timeValue = (t - t0) * 0.001;
      (program.uniforms.iTime as { value: number }).value = timeValue;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = mouseRef.current.x;
      mouseUniform[1] = mouseRef.current.y;

      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      try {
        containerEl?.removeChild(canvas);
      } catch {
        console.warn('Canvas already removed');
      }
    };
  }, [color1, color2, color3, speed, scale, offsetX, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#05020a', // Dark fallback while WebGL loads
      }}
    />
  );
};

export default PlasmaBackground;
