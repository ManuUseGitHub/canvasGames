export const clickedHandled = (state: any) => {
    if (state.dragged) {
        state.pointClicked = {};
        state.dragged = false;
    }
}