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

// Framer-style Animated Gradient Background shader
// Settings: Swirl: 31, Iterations: 10, Softness: 100, Speed: 53, Scale: 0.45
const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1; // Blackish Blue
uniform vec3 uColor2; // Navy Blue  
uniform vec3 uColor3; // White
uniform float uSpeed;
uniform float uScale;
uniform float uSwirl;
uniform float uIterations;
uniform float uSoftness;
uniform float uProportion;

out vec4 fragColor;

// Smooth noise function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion for smooth turbulence
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

// Swirl distortion
vec2 swirl(vec2 uv, vec2 center, float amount, float time) {
  vec2 delta = uv - center;
  float dist = length(delta);
  float angle = atan(delta.y, delta.x);
  float swirlAmount = amount * exp(-dist * 2.0) * sin(time * 0.5 + dist * 3.0);
  angle += swirlAmount;
  return center + dist * vec2(cos(angle), sin(angle));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 center = vec2(0.5);
  
  float time = iTime * uSpeed * 0.01;
  
  // Apply swirl distortion
  float swirlAmount = uSwirl * 0.01;
  vec2 distortedUv = swirl(uv, center, swirlAmount, time);
  
  // Scale from center
  distortedUv = (distortedUv - center) / uScale + center;
  
  // Create flowing gradient layers
  float flow1 = fbm(distortedUv * 3.0 + time * 0.3);
  float flow2 = fbm(distortedUv * 2.0 - time * 0.2 + vec2(10.0));
  float flow3 = fbm(distortedUv * 4.0 + time * 0.15 + vec2(20.0));
  
  // Combine flows
  float combinedFlow = flow1 * 0.5 + flow2 * 0.3 + flow3 * 0.2;
  
  // Create the gradient mixing factor with softness
  float softFactor = uSoftness * 0.01;
  float gradientMix = smoothstep(0.2 * softFactor, 0.8 * softFactor, combinedFlow);
  
  // Proportion-based vertical gradient (light coming from bottom center)
  float verticalGrad = pow(1.0 - uv.y, uProportion * 0.1);
  float horizontalDist = abs(uv.x - 0.5) * 2.0;
  float radialLight = (1.0 - horizontalDist * 0.7) * verticalGrad;
  radialLight = smoothstep(0.0, 1.0, radialLight);
  
  // Mix colors based on flow and position
  vec3 baseColor = mix(uColor1, uColor2, gradientMix);
  
  // Add the white/light glow from bottom
  float lightIntensity = radialLight * (0.5 + flow1 * 0.5);
  lightIntensity = pow(lightIntensity, 1.5);
  
  vec3 finalColor = mix(baseColor, uColor3, lightIntensity * 0.8);
  
  // Add subtle pulsing glow
  float pulse = sin(time * 2.0) * 0.5 + 0.5;
  finalColor += uColor3 * radialLight * pulse * 0.1;
  
  // Subtle noise dither to prevent banding
  float dither = (hash(gl_FragCoord.xy + time) - 0.5) * 0.02;
  finalColor += dither;
  
  // Clamp to valid range
  finalColor = clamp(finalColor, 0.0, 1.0);
  
  fragColor = vec4(finalColor, 1.0);
}`;

interface FramerGradientProps {
    color1?: string; // Blackish Blue
    color2?: string; // Navy Blue
    color3?: string; // White (light)
    speed?: number;  // 53 in Framer
    scale?: number;  // 0.45 in Framer
    swirl?: number;  // 31 in Framer
    iterations?: number; // 10 in Framer
    softness?: number;   // 100 in Framer
    proportion?: number; // 28 in Framer
}

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0.05, 0.02, 0.1];
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

export const FramerGradient = ({
    color1 = '#0a0818', // Blackish Blue
    color2 = '#1a0a4a', // Navy Blue
    color3 = '#ffffff', // White
    speed = 53,
    scale = 0.45,
    swirl = 31,
    iterations = 10,
    softness = 100,
    proportion = 28,
}: FramerGradientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(true);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const containerEl = containerRef.current;

        const color1Rgb = hexToRgb(color1);
        const color2Rgb = hexToRgb(color2);
        const color3Rgb = hexToRgb(color3);

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
                uColor1: { value: new Float32Array(color1Rgb) },
                uColor2: { value: new Float32Array(color2Rgb) },
                uColor3: { value: new Float32Array(color3Rgb) },
                uSpeed: { value: speed },
                uScale: { value: scale },
                uSwirl: { value: swirl },
                uIterations: { value: iterations },
                uSoftness: { value: softness },
                uProportion: { value: proportion },
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
    }, [color1, color2, color3, speed, scale, swirl, iterations, softness, proportion]);

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
