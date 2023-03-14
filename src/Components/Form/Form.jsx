import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewDate } from "../../store/homeSlice";
import "./Form.css";

export default function Form() {
  const dateRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      addNewDate({
        date: dateRef.current.value,
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
      <form className="form" onSubmit={submitHandler}>
        <div className="form-top">
          <input type="text" placeholder="Type here" ref={nameRef} />
        </div>
        <div className="form-bottom">
          <input type="date" className="input-date" defaultValue={new Date()} ref={dateRef} />
          <button onClick={submitHandler} className="add-new-task"> Add </button>
        </div>
      </form>
    </div>
  );
}
