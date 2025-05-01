"use client"
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react"
//canvas library p5.js, fabric

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        
        
        if(canvasRef.current){
            const canvas = canvasRef.current;
            initDraw(canvas);
        }
    }, [canvasRef]);


    return (<div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="bg-white" ></canvas>
    </div>
    )
}