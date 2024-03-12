import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = { todoInput: "", todosList: [] };

  onInputChange = (event) => {
    this.setState({ todoInput: event.target.value });
  };

  newTodoItem = (todoInputItem) => {
    return {
      title: todoInputItem.substring(0, todoInputItem.length - 1),
      id: uuidv4(),
      counter : 0,
    };
  };

  addTodo = () => {
    if (this.state.todoInput !== "") {
      let { todoInput } = this.state;

      todoInput.trim();

      // extracting last character and converting it to number
      let numOfTimes = Number(todoInput.charAt(todoInput.length - 1));

      if (isNaN(numOfTimes)) {
        numOfTimes = 1;
        todoInput = todoInput + "1";
      }

      const newItems = [];

      // creating new todo items with differnet id's using while loop
      while (numOfTimes > 0) {
        newItems.push(this.newTodoItem(todoInput));
        numOfTimes -= 1;
      }

      //const newItems = this.newTodoItem(todoInput);

      this.setState((prevVal) => ({
        todosList: [...prevVal.todosList, ...newItems],
        todoInput: "",
      }));
    }
  };

  deleteListItem = (key) => {
    const { todosList } = this.state;

    // Filtering values and leave value which we need to delete
    const updateList = todosList.filter((item) => item.id !== key);

    // Updating list in state
    this.setState({
      todosList: updateList,
    });
  };

  editItem = (key) => {
    const { todosList } = this.state;
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todosList];
      const editedTodoIndex = todosList.findIndex((item) => item.id === key);
      updatedTodos[editedTodoIndex].title = editedTodo;
      updatedTodos[editedTodoIndex].counter += 1;
      this.setState({
        todosList: updatedTodos,
      });
    }
  };

  render() {
    const { todoInput, todosList } = this.state;
    console.log(todosList);

    return (
      <div className="todo-page-content">
        <h1>Day Goals!</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="what needs to be done"
            className="input-box"
            value={todoInput}
            onChange={this.onInputChange}
          />
          <button type="button" class="add-todo-btn" onClick={this.addTodo}>
            Add Todo
          </button>
        </div>

        <ul className="todo-items-container">
          {todosList.map((listItem) => (
            <TodoItem
              listItem={listItem}
              key={listItem.id}
              deleteListItem={this.deleteListItem}
              editItem={this.editItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
