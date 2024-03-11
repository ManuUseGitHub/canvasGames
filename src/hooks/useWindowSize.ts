import { useEventHandler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

// Hook
export const useWindowSize = (context: ApplicationContextType) => {
  const windowRef = Object.assign({ current: window });
  useEventHandler("resize", windowRef, () => {
    context.setFrames(0)
  }, [windowRef.current.innerWidth]);
}