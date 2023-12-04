import DATA from "../components/fetchData/constants";

const initalState = {
  linksData: [],
  isLoading: false,
  isError: false,
};

/**
 * Data reducer
 * @param {*} state : current state
 * @param {*} action : action to be executed
 * @returns
 */
const dataReducer = (state = initalState, action) => {
  switch (action.type) {
    case DATA.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DATA.LOAD_SUCCESS:
      return {
        ...state,
        linksData: action.linksData,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;