import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cinemaList } from "../redux/cinema/cinemaAction";

export default function Cinemas() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cinemaList());
  }, []);

  const data = useSelector((state) => state.cinemaData);
  console.log("data", data);
  return <div>Cinemas</div>;
}
