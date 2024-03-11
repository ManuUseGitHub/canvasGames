export const _2π = 2 * Math.PI;
export const _π = Math.PI;
export const BOARD_STROKE_COLOR = "#1b1b1b"; // "#7DAF96"
export const CANVAS_BG_COLOR = "#333333"; // "#7DAF96"
export const BOARD_BG_COLOR = "#eed4b2"; // "#7DAF96"
export const BOARD_SELECT_COLOR = "#eebb77";
export const FREE_MOVE = "#7DAF96";
export const BLOCKED_MOVE = "#DF5959";
export const UNDROPABLE_MOVE = BLOCKED_MOVE+"22";
export const ALLY_MOVE = "#dfceb9";
export const WHITE = "#ffffff";

export const MAX_CELL_H = 95;
export const CELL_H = 95;
export const CELL_W = 85;
export const CELL_H_COUNT = 9;
export const CELL_W_COUNT = 9;
export const RESERVE_H = 80;
export const RESERVE_W = 60;
export const CURVE_H_DEPTH = 25;

export const DEFAULT_CELL = {
    i: Math.floor(CELL_H_COUNT / 2),
    j: Math.floor(CELL_W_COUNT / 2)
}

export const BOARD_GRAB_FROM = 2;
export const OUT_GRAB_FROM = 3;

export const NOT_FOUND_INDEX = -1;

export const PLUS_KEY = 187;
export const MINUS_KEY = 189;

export const MODES = {
    // ---------- NORMAL modes ------------------
    VERSUS_MODE: 0, 
    CHALENGE_MODE: 100, 
    EXPLAIN_MODE: 200, 
    FREE_MODE: 300,

    // ----------- DEBUG modes ------------------
    DEBUG_VS_MODE:900,
    DEBUG_CHALENGE_MODE:910,
    DEBUG_EXPLAIN_MODE:920,
    DEBUG_FREE_MODE:930
}

export const INITIAL_MODE = MODES.VERSUS_MODE;
