import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Framer-style smooth animated gradient with glow
const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;

out vec4 fragColor;

#define PI 3.14159265359

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float aspect = iResolution.x / iResolution.y;
  
  float time = iTime * uSpeed * 0.02;
  
  // Base colors - matching Framer design
  vec3 darkBlue = vec3(0.02, 0.01, 0.06);      // Very dark blue/black
  vec3 deepPurple = vec3(0.15, 0.05, 0.35);    // Deep purple
  vec3 brightPurple = vec3(0.4, 0.2, 0.7);     // Brighter purple
  vec3 white = vec3(1.0, 0.95, 1.0);           // Slightly warm white
  
  // Create flowing noise layers
  vec2 noiseCoord = uv * vec2(aspect, 1.0);
  
  float noise1 = fbm(noiseCoord * 2.0 + time * 0.3);
  float noise2 = fbm(noiseCoord * 1.5 - time * 0.2 + 10.0);
  float noise3 = fbm(noiseCoord * 3.0 + time * 0.15 + 20.0);
  
  // Combine noises for smooth flowing effect
  float flow = (noise1 + noise2 * 0.7 + noise3 * 0.3) / 2.0;
  flow = smoothstep(-0.3, 1.0, flow);
  
  // Create the main gradient - dark at top corners, lighter in center-bottom
  float vignette = 1.0 - length((uv - vec2(0.5, 0.3)) * vec2(1.2, 0.8));
  vignette = smoothstep(0.0, 1.0, vignette);
  
  // Strong white glow from bottom center (the key Framer effect)
  vec2 glowCenter = vec2(0.5, -0.3); // Below screen, emanating upward
  float glowDist = length((uv - glowCenter) * vec2(1.0, 0.6));
  float glow = 1.0 - smoothstep(0.0, 1.2, glowDist);
  glow = pow(glow, 1.8);
  
  // Add some noise variation to the glow
  glow *= (0.85 + noise1 * 0.15);
  
  // Secondary glow pulses
  float pulse = sin(time * 1.5) * 0.5 + 0.5;
  float glowPulse = glow * (0.9 + pulse * 0.1);
  
  // Side aurora-like effects
  float leftAurora = exp(-pow((uv.x + 0.2) * 4.0, 2.0)) * (1.0 - uv.y);
  float rightAurora = exp(-pow((uv.x - 1.2) * 4.0, 2.0)) * (1.0 - uv.y);
  float aurora = (leftAurora + rightAurora) * (0.7 + noise2 * 0.3);
  
  // Build the final color
  // Start with dark base
  vec3 color = darkBlue;
  
  // Add deep purple based on flow and position
  color = mix(color, deepPurple, flow * 0.6 + vignette * 0.4);
  
  // Add brighter purple in flowing areas
  color = mix(color, brightPurple, flow * vignette * 0.5);
  
  // Add aurora on edges
  color = mix(color, brightPurple * 1.3, aurora * 0.4);
  
  // Add the white glow from bottom
  color = mix(color, white, glowPulse * 0.85);
  
  // Add subtle purple tint to the glow edges
  vec3 purpleGlow = mix(brightPurple, white, 0.5);
  float glowEdge = glow * (1.0 - glow);
  color = mix(color, purpleGlow, glowEdge * 0.5);
  
  // Dither to prevent banding
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.02;
  color += dither;
  
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

interface FramerGradientProps {
    speed?: number;
}

export const FramerGradient = ({
    speed = 50,
}: FramerGradientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(true);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const containerEl = containerRef.current;

        const renderer = new Renderer({
            webgl: 2,
            alpha: false,
            antialias: false,
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        });
        const gl = renderer.gl;
        const canvas = gl.canvas;
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        containerEl.appendChild(canvas);

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uSpeed: { value: speed },
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            renderer.setSize(width, height);
            const res = program.uniforms.iResolution.value as Float32Array;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
        };

        const ro = new ResizeObserver(setSize);
        ro.observe(containerEl);
        setSize();

        const io = new IntersectionObserver(
            (entries) => {
                isVisibleRef.current = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0 }
        );
        io.observe(containerEl);

        const t0 = performance.now();

        const loop = (t: number) => {
            if (!isVisibleRef.current) {
                rafRef.current = requestAnimationFrame(loop);
                return;
            }

            const timeValue = (t - t0) * 0.001;
            (program.uniforms.iTime as { value: number }).value = timeValue;

            renderer.render({ scene: mesh });
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            io.disconnect();
            try {
                containerEl?.removeChild(canvas);
            } catch {
                console.warn('Canvas already removed');
            }
        };
    }, [speed]);

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
            }}
        />
    );
};

export default FramerGradient;
