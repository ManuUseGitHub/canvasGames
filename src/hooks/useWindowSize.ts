import { useEffect } from "react";
import { handler } from "./handleEffect";
import { ApplicationContextType } from "../resources/types";

// Hook
export const useWindowSize = (context: ApplicationContextType) => {
  const windowRef = Object.assign({ current: window });
  useEffect(() => handler("resize", windowRef, () => {
    context.setFrames(0)
  }), [windowRef.current.innerWidth]);
}