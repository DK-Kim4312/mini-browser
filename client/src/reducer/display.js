export const DISPLAY_LIST = 'DISPLAY_LIST';
export const HIDE_LIST = 'HIDE_LIST';
export const TOGGLE_LIST = 'TOGGLE_LIST';

const initialState = {
    isShow: false,
}

/**
 * Display reducer
 * @param {*} state : current state
 * @param {*} action : action to be executed
 * @returns
 */
const displayReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_LIST:
            return {
                ...state,
                isShow: true,
            }
        case HIDE_LIST:
            return {
                ...state,
                isShow: false,
            }
        case TOGGLE_LIST:
            return {
                ...state,
                isShow: !state.isShow,
            }
        default:
            return state;
    }
}

export default displayReducer;