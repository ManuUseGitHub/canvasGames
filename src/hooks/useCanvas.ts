
import { useRef, useEffect } from 'react'

const useCanvas = (draw:any, options:any = {}) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas:any = canvasRef.current
    const ctx = canvas.getContext(options.context || '2d')

    let frameCount = 0
    let animationFrameId:number;

    const render = () => {
      frameCount++
      draw(ctx, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}
export default useCanvas