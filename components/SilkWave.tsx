import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface ClothWaveProps {
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    scale?: number;
    foldIntensity?: number;
    interactive?: boolean;
}

// Convert hex to RGB normalized (0-1)
function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
        ];
    }
    return [0, 0, 0];
}

export const SilkWave = ({
    color1 = '#151326', // Blackish Blue
    color2 = '#24006D', // Navy Blue / Deep Purple
    color3 = '#FFFFFF', // White highlights
    speed = 0.25,
    scale = 0.8,
    foldIntensity = 2.0,
    interactive = true,
}: ClothWaveProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer({ antialias: true, alpha: false });
        const gl = renderer.gl;

        const [r1, g1, b1] = hexToRgb(color1);
        const [r2, g2, b2] = hexToRgb(color2);
        const [r3, g3, b3] = hexToRgb(color3);

        const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uScale;
      uniform float uFoldIntensity;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
        
        float time = uTime;
        
        // Mouse influence
        vec2 mousePos = (uMouse - 0.5) * vec2(aspect, 1.0);
        float mouseDist = length(p - mousePos);
        float mouseInfluence = exp(-mouseDist * 2.5) * 0.4;
        
        // Distort position based on mouse
        vec2 distortedP = p + (p - mousePos) * mouseInfluence * 0.2;
        
        // Create cloth fold pattern - more like draped fabric
        // Main diagonal fold direction
        float foldAngle = 0.7;
        vec2 foldDir = vec2(cos(foldAngle), sin(foldAngle));
        float foldCoord = dot(distortedP, foldDir);
        
        // Primary cloth folds - large wavy creases
        float fold1 = sin(foldCoord * 3.0 * uScale + time * 0.5 + snoise(distortedP * 2.0 + time * 0.2) * 0.5);
        float fold2 = sin(foldCoord * 5.0 * uScale - time * 0.3 + snoise(distortedP * 3.0 - time * 0.15) * 0.4);
        float fold3 = sin(foldCoord * 8.0 * uScale + time * 0.2) * 0.5;
        
        // Secondary cross folds for cloth texture
        vec2 crossDir = vec2(-foldDir.y, foldDir.x);
        float crossCoord = dot(distortedP, crossDir);
        float crossFold = sin(crossCoord * 4.0 * uScale + time * 0.25) * 0.3;
        
        // Combine folds with intensity
        float folds = (fold1 * 0.5 + fold2 * 0.3 + fold3 * 0.2 + crossFold) * uFoldIntensity;
        
        // Add mouse ripple
        float ripple = sin(mouseDist * 12.0 - time * 4.0) * mouseInfluence;
        folds += ripple;
        
        // Normalize to 0-1 range
        float foldValue = folds * 0.5 + 0.5;
        foldValue = clamp(foldValue, 0.0, 1.0);
        
        // Create gradient base
        float gradient = uv.x * 0.3 + uv.y * 0.5 + 0.2;
        
        // Mix colors based on fold depth
        vec3 baseColor = mix(uColor1, uColor2, gradient);
        
        // Folds create shadows and highlights
        float shadow = smoothstep(0.3, 0.5, foldValue);
        float highlight = smoothstep(0.6, 0.85, foldValue);
        
        // Apply shadows (darken in valleys)
        vec3 color = mix(uColor1 * 0.7, baseColor, shadow);
        
        // Apply highlights (lighten on peaks) - cloth catching light
        color = mix(color, mix(uColor2, uColor3, 0.3), highlight * 0.6);
        
        // Extra white highlight on sharp peaks
        float peakHighlight = smoothstep(0.75, 0.95, foldValue) * 0.25;
        peakHighlight += mouseInfluence * 0.15;
        color = mix(color, uColor3, peakHighlight);
        
        // Subtle noise for fabric texture
        float fabricNoise = snoise(uv * 50.0) * 0.02;
        color += fabricNoise;
        
        // Vignette
        float vignette = 1.0 - pow(length(uv - 0.5) * 0.65, 2.0) * 0.2;
        color *= vignette;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
                uColor1: { value: new Float32Array([r1, g1, b1]) },
                uColor2: { value: new Float32Array([r2, g2, b2]) },
                uColor3: { value: new Float32Array([r3, g3, b3]) },
                uScale: { value: scale },
                uFoldIntensity: { value: foldIntensity },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
            }
        });
        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            const resUniform = program.uniforms.uResolution.value as Float32Array;
            resUniform[0] = gl.canvas.width;
            resUniform[1] = gl.canvas.height;
        }
        window.addEventListener('resize', resize);
        resize();

        // Mouse tracking
        let targetMouse = { x: 0.5, y: 0.5 };
        let currentMouse = { x: 0.5, y: 0.5 };

        function handleMouseMove(event: MouseEvent) {
            const rect = container.getBoundingClientRect();
            targetMouse.x = (event.clientX - rect.left) / rect.width;
            targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
        }

        function handleTouchMove(event: TouchEvent) {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                const rect = container.getBoundingClientRect();
                targetMouse.x = (touch.clientX - rect.left) / rect.width;
                targetMouse.y = 1 - (touch.clientY - rect.top) / rect.height;
            }
        }

        if (interactive) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('touchmove', handleTouchMove);
        }

        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);

            // Smooth mouse following
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.03;
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.03;

            const mouseUniform = program.uniforms.uMouse.value as Float32Array;
            mouseUniform[0] = currentMouse.x;
            mouseUniform[1] = currentMouse.y;

            (program.uniforms.uTime as { value: number }).value = t * 0.001 * speed;
            renderer.render({ scene: mesh });
        }
        animationId = requestAnimationFrame(update);

        container.appendChild(gl.canvas);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (interactive) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('touchmove', handleTouchMove);
            }
            if (gl.canvas.parentElement) {
                gl.canvas.parentElement.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [color1, color2, color3, speed, scale, foldIntensity, interactive]);

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

export default SilkWave;
