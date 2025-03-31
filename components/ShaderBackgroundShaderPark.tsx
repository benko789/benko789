'use client';
// @ts-ignore
import {sculptToMinimalRenderer} from 'shader-park-core';

import {useEffect, useRef} from 'react';
import {spCode} from '../spCode.js';

export const ShaderBackgroundShaderPark = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const programRef = useRef<WebGLProgram>(null);
    const hasLoadedBefore = useRef(true);
    var b_test = false;

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;
        
        // const devicePixelRatio = window.devicePixelRatio || 1;
        // canvas.width = 200;
        // canvas.height = 200;
        // canvas.width = 200 * devicePixelRatio;
        // canvas.height = 200 * devicePixelRatio;
        
        let state = {
            buttonHover: 0.0,
            currButtonHover: 0.0,
            click: 0.0,
            currClick: 0.0,
            backgroundColor: "vec3(0.0, 0.0, 0.0)",
        };
        let test = 5;
        
        canvas.addEventListener('mouseover', () => state.buttonHover = 5, false);
        canvas.addEventListener('mouseout', () => state.buttonHover = 0.0, false);
        canvas.addEventListener('mousedown', () => state.click = 1.0, false);
        canvas.addEventListener('mouseup', () => state.click = 0.0, false);
        
        // Debugging: Check if the shader program is created and linked correctly
        console.log("Shader Program:", gl.CURRENT_PROGRAM);
        // This converts your Shader Park code into a shader and renders it to the my-canvas element
        if (hasLoadedBefore.current && process.env.NODE_ENV != 'production') {
            // console.log("Shader Program:", gl.CURRENT_PROGRAM);
            hasLoadedBefore.current = false;
        } else {
            // const temp = sculptToMinimalRenderer(canvas, spCode);
            const temp = sculptToMinimalRenderer(canvas, spCode, () => {
                return {
                    'backgroundColor' : [0.0, 0.0, 0.0]
                };
            });
            const program = gl.getParameter(gl.CURRENT_PROGRAM);
            programRef.current = program;
            console.log(temp);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            

            // gl.clearColor(0.1, 0.1, 0.1, 0.1);
            // sculptToMinimalRenderer(canvas, spCode, () => {
            //     state.currButtonHover = state.currButtonHover*.999 + state.buttonHover*.001;
            //     state.currClick = state.currClick*.92 + state.click*.08;
            //     return {
            //         'buttonHover' : state.currButtonHover,
            //         'click' : state.currClick
            //     };
            // });
        }
        
        console.log(programRef.current);
        if (!programRef.current) return;
        // const resolutionLocation = gl.getUniformLocation(programRef.current, 'resolution');

        let animationFrameId: number;
        const animate = (time: number) => {
            // gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
          // Update CSS variable with the canvas data URL
            // const dataUrl = canvas.toDataURL("image/jpeg", 0.1);
            // const dataUrl = canvas.toDataURL("image/png", 0.1);
            // document.documentElement.style.setProperty('--shader-canvas', `url(${dataUrl})`);
            const pngcanvas = document.getElementById('pngCanvas') as HTMLCanvasElement;
            const pngctx = pngcanvas.getContext('2d') as CanvasRenderingContext2D;
            pngctx.clearRect(0, 0, canvas.width/5.0, canvas.height/5.0); 
            pngctx.drawImage(canvas, 0, 0, canvas.width/5.0, canvas.height/5.0); 
            const pngdataUrl = pngcanvas.toDataURL("image/png");
            document.documentElement.style.setProperty('--shader-canvas', `url(${pngdataUrl})`);
    
            animationFrameId = requestAnimationFrame(animate);
        };

        // Handle window resize
        const handleResize = () => {
            const devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * devicePixelRatio;
            canvas.height = window.innerHeight * devicePixelRatio;
            const pngcanvas = document.getElementById('pngCanvas') as HTMLCanvasElement;
            pngcanvas.width = canvas.width/5.0;
            pngcanvas.height = canvas.height/5.0;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
        animate(0);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            canvasRef.current = null;
        };

    }, [b_test]);


    return (
        <canvas
          ref={canvasRef}
        //   className="fixed top-0 left-0"
        //   className="fixed top-0 left-0 -z-10 shader-background"
          className="fixed -top-1/2 md:-top-1/4 -z-10 shader-background"
          
        />
      );
  }; 