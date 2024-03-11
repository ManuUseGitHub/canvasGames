import { useEffect } from "react";

export const useEventHandler = (eventName: string, windowRef: any, cb: (ev: any) => void, args: any[] = [], initValue: any = null) => {
    return useEffect(() => {
        function handle(evt: any) {
            cb(evt);
        }
        windowRef.current.addEventListener(eventName, handle);
        handle(initValue);

        // Remove event listener on cleanup
        return () => {
            windowRef.current.removeEventListener(eventName, handle)
        };
    }, [args]);
}