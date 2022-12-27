import { takeEvery, put } from "redux-saga/effects";
import { CINEMA_LIST, SET_CINEMA_LIST } from "../constant";

function* getCinemas() {
  let data = yield fetch("http://localhost:8800/api/cinemas");
  data = yield data.json();
  console.warn("CINEMAS", data);
  yield put({ type: SET_CINEMA_LIST, data });
}

function* cinemaSaga() {
  yield takeEvery(CINEMA_LIST, getCinemas);
}

export default cinemaSaga;
