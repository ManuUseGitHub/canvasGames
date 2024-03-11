import { useEffect } from "react";

export const handler = (eventName: string, windowRef: any, cb: (ev: any) => void, initValue: any = null,cleanUpCb : any = null) => {
    function handle(evt: any) {
        cb(evt);
    }
    windowRef.current.addEventListener(eventName, handle);
    handle(initValue);

    // Remove event listener on cleanup
    return () => {
        windowRef.current.removeEventListener(eventName, handle)
        if(cleanUpCb){
            cleanUpCb();
        }
    };
}