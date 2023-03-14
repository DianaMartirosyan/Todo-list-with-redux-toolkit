import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CurrentDayForm from "../../Components/currentDayForm/CurrentDayForm";
import DailyTask from "../../Components/DailyTask/DailyTask";
import { clearCompletedHandler, deleteAllHandler } from "../../store/homeSlice";
import "./SingleTask.css";

export default function SingleTask() {
  let { oneDay } = useParams();
  const dailyList = useSelector((store) => store.homeSlice[oneDay]);
  const dispatch = useDispatch();

  const completed = dailyList.filter((item) => item.isCompleted);

  function clearCompleted() {
    dispatch(
      clearCompletedHandler({
        date: oneDay,
      })
    );
  }

  function deleteAll() {
    dispatch(
      deleteAllHandler({
        date: oneDay,
      })
    );
  }

  return (
    <div className="daily-todo-page">
      <div className="daily-todo-list-container">
        <div className="daily-container-header">
          <Link to="/">
            <button>Back home</button>
          </Link>
          <h1>{oneDay}</h1>
        </div>

        <div className="new-task-container">
          <h1>New task</h1>

          <CurrentDayForm oneDay={oneDay} />
        </div>

        <div className="daily-todo-list">
          {dailyList[0] &&
            dailyList.map((item) => (
              <DailyTask key={item.id} item={item} oneDay={oneDay} />
            ))}
        </div>
        <div className="todo-footer">
          <div className="completed-number">
            {completed.length}/{dailyList.length}
          </div>
          <div className="clear-buttons">
            <button onClick={clearCompleted}>Clear completed</button>
            <button onClick={deleteAll}>Delete All</button>
          </div>
        </div>
      </div>
    </div>
  );
}
