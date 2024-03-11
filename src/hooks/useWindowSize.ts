import { redimension } from "../redux/properties/slice/sizeSlice";
import { ApplicationContextType } from "../resources/types";
import { useEventHandler } from "./handleEffect";

// Hook
export const useWindowSize = (canvas: any, context: ApplicationContextType, dispatch: any) => {
  useEventHandler("resize", canvas, () => {
    const dimention = hasNodeName(canvas) ?
      getDimensionsOfNode(canvas.current) : 
      getDimensionsOfWindow(canvas.current)

    dispatch(redimension(dimention))
  }, [
    canvas.current?.width, 
    canvas.current?.height,
    canvas.current?.innerWidth,
    canvas.current?.innerHeight,
  ]);
}

const getDimensionsOfWindow = (current: any) => ({
  width: current.innerWidth,
  height: current.innerHeight
})

const getDimensionsOfNode = (current: any) => ({
  width: current.width,
  height: current.height
})

const hasNodeName = (canvas:any) => canvas.current.nodeName