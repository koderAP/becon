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

// Framer "Animated Gradient Background" shader implementation
// Exact parameters from Framer component
const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uColor1;      // Blackish Blue
uniform vec3 uColor2;      // Navy Blue
uniform vec3 uColor3;      // White
uniform float uRotation;    // 0
uniform float uProportion;  // 28
uniform float uScale;       // 0.45
uniform float uSpeed;       // 53
uniform float uDistortion;  // 0
uniform float uSwirl;       // 31
uniform float uIterations;  // 10
uniform float uSoftness;    // 100
uniform float uOffset;      // 0
uniform float uShapeSize;   // 10
uniform float uRadius;      // 0

out vec4 fragColor;

#define PI 3.14159265359

// Rotation matrix
mat2 rotate(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
}

// Smooth noise
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

// Checker pattern (Shape: Checks)
float checkerPattern(vec2 p, float size) {
    vec2 q = floor(p / size);
    return mod(q.x + q.y, 2.0);
}

// Swirl distortion
vec2 swirl(vec2 uv, vec2 center, float amount, float radius) {
    vec2 delta = uv - center;
    float dist = length(delta);
    float angle = atan(delta.y, delta.x);
    float swirlFactor = 1.0 - smoothstep(0.0, radius, dist);
    angle += amount * swirlFactor * swirlFactor;
    return center + dist * vec2(cos(angle), sin(angle));
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 center = vec2(0.5);
    float aspect = iResolution.x / iResolution.y;
    
    // Time with speed control (Speed: 53 maps to animation speed)
    float time = iTime * uSpeed * 0.01;
    
    // Apply rotation (Rotation: 0)
    vec2 rotatedUv = uv - center;
    rotatedUv = rotate(uRotation * PI / 180.0) * rotatedUv;
    rotatedUv += center;
    
    // Apply scale from center (Scale: 0.45)
    vec2 scaledUv = (rotatedUv - center) / uScale + center;
    
    // Apply offset
    scaledUv.y += uOffset * 0.01;
    
    // Apply swirl distortion (Swirl: 31)
    float swirlAmount = uSwirl * 0.02;
    float swirlRadius = 2.0;
    vec2 swirlCenter = center + vec2(0.0, -0.3);
    vec2 distortedUv = swirl(scaledUv, swirlCenter, swirlAmount * sin(time * 0.5), swirlRadius);
    
    // Apply distortion (Distortion: 0)
    distortedUv += uDistortion * 0.01 * vec2(
        noise(scaledUv * 5.0 + time),
        noise(scaledUv * 5.0 + time + 100.0)
    );
    
    // Checker pattern (Shape: Checks, Shape Size: 10)
    float shapeSize = uShapeSize * 0.1;
    float checker = checkerPattern(distortedUv * 10.0 + time * 0.2, shapeSize);
    
    // Iterations - create multiple layers (Iterations: 10)
    float layers = 0.0;
    for (float i = 0.0; i < 10.0; i++) {
        if (i >= uIterations) break;
        float scale = 1.0 + i * 0.3;
        vec2 layerUv = distortedUv * scale + vec2(time * 0.1 * (mod(i, 2.0) * 2.0 - 1.0), i * 0.1);
        layers += noise(layerUv * 3.0) / scale;
    }
    layers /= uIterations * 0.3;
    
    // Proportion - controls the gradient distribution (Proportion: 28)
    float proportion = uProportion * 0.01;
    
    // Create the gradient based on position and noise
    float gradientBase = 1.0 - uv.y; // Bottom to top
    gradientBase = pow(gradientBase, proportion * 0.5 + 0.5);
    
    // Horizontal centering for the light
    float horizontalFade = 1.0 - abs(uv.x - 0.5) * 2.0;
    horizontalFade = pow(horizontalFade, 0.5);
    
    // Combine for light intensity from bottom center
    float lightIntensity = gradientBase * horizontalFade;
    lightIntensity *= (0.7 + layers * 0.3);
    
    // Softness - blending between colors (Softness: 100)
    float softness = uSoftness * 0.01;
    
    // Mix colors with soft transitions
    float mixFactor = smoothstep(0.0, softness, layers + checker * 0.1);
    vec3 color = mix(uColor1, uColor2, mixFactor);
    
    // Add the white glow from bottom center
    float glowIntensity = pow(lightIntensity, 2.0 - softness);
    glowIntensity = smoothstep(0.0, 1.0, glowIntensity);
    color = mix(color, uColor3, glowIntensity * 0.9);
    
    // Subtle color bleeding at edges
    float edgeGlow = (1.0 - abs(uv.x - 0.5) * 1.5) * (1.0 - uv.y * 0.5);
    color = mix(color, uColor2 * 1.5, edgeGlow * layers * 0.2);
    
    // Dither to prevent banding
    float dither = (hash(gl_FragCoord.xy + time) - 0.5) * 0.015;
    color += dither;
    
    fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

interface FramerGradientProps {
    // Colors
    color1?: string;     // Blackish Blue
    color2?: string;     // Navy Blue
    color3?: string;     // White
    // Framer exact parameters
    rotation?: number;   // 0
    proportion?: number; // 28
    scale?: number;      // 0.45
    speed?: number;      // 53
    distortion?: number; // 0
    swirl?: number;      // 31
    iterations?: number; // 10
    softness?: number;   // 100
    offset?: number;     // 0
    shapeSize?: number;  // 10
    radius?: number;     // 0
}

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0.05, 0.02, 0.1];
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

export const FramerGradient = ({
    // Default colors matching Framer's Blackish Blue, Navy Blue, White
    color1 = '#08081a',  // Blackish Blue
    color2 = '#1a0a5c',  // Navy Blue  
    color3 = '#ffffff',  // White 100
    // Exact Framer values from screenshot
    rotation = 0,
    proportion = 28,
    scale = 0.45,
    speed = 53,
    distortion = 0,
    swirl = 31,
    iterations = 10,
    softness = 100,
    offset = 0,
    shapeSize = 10,
    radius = 0,
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
                uRotation: { value: rotation },
                uProportion: { value: proportion },
                uScale: { value: scale },
                uSpeed: { value: speed },
                uDistortion: { value: distortion },
                uSwirl: { value: swirl },
                uIterations: { value: iterations },
                uSoftness: { value: softness },
                uOffset: { value: offset },
                uShapeSize: { value: shapeSize },
                uRadius: { value: radius },
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
    }, [color1, color2, color3, rotation, proportion, scale, speed, distortion, swirl, iterations, softness, offset, shapeSize, radius]);

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
