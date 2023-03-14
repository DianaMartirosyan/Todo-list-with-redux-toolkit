import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewDate } from "../../store/homeSlice";
import "./CurrentDayForm.css";

export default function CurrentDayForm({ oneDay }) {
  const nameRef = useRef();
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      addNewDate({
        date: oneDay,
        content: {
          id: Math.random(),
          taskName: nameRef.current.value,
          isCompleted: false,
        },
      })
    );
    nameRef.current.value = "";
  }

  return (
    <div className="input-and-button-container">
      <form className="current-day-form" onSubmit={submitHandler}>
        <input type="text" placeholder="Type here" ref={nameRef} />
        <button onClick={submitHandler}> Add </button>
      </form>
    </div>
  );
}
