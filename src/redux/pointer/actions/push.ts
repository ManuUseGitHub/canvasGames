export const pusHandled = (state: any) => {
    state.down = true;

    state.to = {}
    state.from = state.coords;
    state.pointClicked = state.coords;
}