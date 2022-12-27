import { SET_CINEMA_LIST } from "../constant";

export const cinemaData = (data = [], action) => {
  switch (action.type) {
    case SET_CINEMA_LIST:
      console.warn("CINEMA REDUCER", action);
      return [...action.data];
    default:
      return data;
  }
};
