import './CSS/todoitems.css';
import check from '../assets/check.png';
import remove from '../assets/delete.png';
import sq from '../assets/square.png';

const Todoitems = ({ no, text, display, settodos }) => {
  const toggleTask = (taskNo) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.map((item) => {
      if (item.no === taskNo) {
        item.display = item.display === "" ? "line-through" : "";
      }
      return item;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    settodos(updatedTodos);
  };

  const deleteTask = (taskNo) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((item) => item.no !== taskNo);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    settodos(updatedTodos);
  };

  return (
    <div className="todoitems">
      <div
        onClick={() => toggleTask(no)}
        className="todoitems-container"
      >
        {display === "" ? (
          <img src={sq} alt="Incomplete Task" />
        ) : (
          <img src={check} alt="Completed Task" />
        )}
        <div
          className="todositems-text"
          style={{ textDecoration: display }}
        >
          {text}
        </div>
      </div>
      <img
        className="todoitems-cross"
        src={remove}
        alt="Delete Task"
        onClick={() => deleteTask(no)}
      />
    </div>
  );
};

export default Todoitems;
