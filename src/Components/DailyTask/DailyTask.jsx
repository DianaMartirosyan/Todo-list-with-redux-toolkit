import { useDispatch } from "react-redux";
import {
  deleteTask,
  editTask,
  toggleState,
  saveTask,
} from "../../store/homeSlice";
import "./DailyTask.css";
import { useRef } from "react";

export default function DailyTask({ item, oneDay }) {
  const dispatch = useDispatch();
  const editableText = useRef();
  const isCompleted = item.isCompleted;

  function removeTask() {
    dispatch(
      deleteTask({
        id: item.id,
        date: oneDay,
      })
    );
  }
  function checkHandler(e) {
    dispatch(
      toggleState({
        id: item.id,
        isCompleted: e.target.checked,
        date: oneDay,
      })
    );
  }

  function editHandler() {
    if (editableText.current.readOnly) {
      editableText.current.readOnly = false;
      dispatch(
        editTask({
          id: item.id,
          isInEditMode: true,
          date: oneDay,
        })
      );
    } else {
      editableText.current.readOnly = true;
      dispatch(
        saveTask({
          id: item.id,
          date: oneDay,
          taskName: editableText.current.value,
          isInEditMode: false,
        })
      );
    }
  }

  return (
    <div className={isCompleted ? "single-task completed" : "single-task"}>
      <div className="single-task-input-container">
        <input
          type="text"
          readOnly
          defaultValue={item.taskName}
          ref={editableText}
        />
      </div>
      <div className="single-task-button-container">
        <input
          className="checkbox"
          type="checkbox"
          checked={isCompleted}
          onChange={checkHandler}
        />
        <button onClick={editHandler}>
          {item.isInEditMode ? "Save" : "Edit"}
        </button>

        <button onClick={removeTask}>Delete</button>
      </div>
    </div>
  );
}
