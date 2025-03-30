import { useEffect, useRef } from 'react';

export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0,2,4));
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Create and compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Create and link program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // Create buffer for vertices
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Get attribute location and enable it
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    // Set up animation loop
    let animationFrameId: number;
    const animate = (time: number) => {
      // Update uniforms
      gl.useProgram(program);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Update CSS variable with the canvas data URL
      const dataUrl = canvas.toDataURL();
      document.documentElement.style.setProperty('--shader-canvas', `url(${dataUrl})`);

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth/10.0;
      canvas.height = window.innerHeight/10.0;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
    //   className="fixed top-0 left-0 size-full -z-10"
      className="fixed top-1/2 left-1/2 -z-10 shader-background"
    />
  );
}; 