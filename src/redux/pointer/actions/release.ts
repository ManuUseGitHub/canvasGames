export const releaseHandled = (state: any) => {
    state.down = false;

    state.from = {}
    state.to = state.coords;
    state.dragging = false;
}