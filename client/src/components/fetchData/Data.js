import axios from "axios";
import DATA from "./constants";

export const requestLinks = (data) => async (dispatch) => {
  dispatch({
    type: DATA.LOAD,
  });
  try {
    const json = await axios.get(data);
    console.log(json);
    dispatch({
      type: DATA.LOAD_SUCCESS,
      linksData: json.data,
      isError: false,
    });
  } catch (e) {
    dispatch({
      type: DATA.LOAD_SUCCESS,
      linksData: [],
      isError: true,
    });
  }
};