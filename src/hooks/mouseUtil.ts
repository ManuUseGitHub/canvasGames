export const useThrottle = (duration: number) => {
    let timeout: any;

    const throttle = (callback: () => void) => {
        if (timeout === undefined) {
            callback();
            timeout = setTimeout(() => {
                // allow another call to be throttled
                timeout = undefined;
            }, duration);
        }
    }

    return { throttle }
} 