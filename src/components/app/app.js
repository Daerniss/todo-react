import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make awesome app'),
        this.createTodoItem('Have a lunch')
      ],
      filter: 'all',
      text: ''
    }
  };

  maxId = 100;

  createTodoItem = (label) => {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(el => el.id !== id);

      return {
        todoData: newArr
      }
    });
  };

  addItem = (label) => {
    const newEl = this.createTodoItem(label);


    this.setState(({ todoData }) => {
      const newArr = [...todoData, newEl];

      return {
        todoData: newArr
      }
    })
  }

  toggleObjectProperty = (arr, id, property) => {
    const newArr = arr.map(el => {
      if (el.id === id) {
        el[property] = !el[property]
      }
      return el;
    });
    return newArr;
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleObjectProperty(todoData, id, 'important')
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleObjectProperty(todoData, id, 'done')
      }
    });
  }

  onSearchChange = (text) => {
    this.setState({ text });
  }

  search = (items, text) => {
    if (text.length === 0) {
      return items;
    }

    return items.filter(el => {
      return el.label.toLowerCase().includes(text.toLowerCase());
    });
  }

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);

      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  render() {

    const { todoData, text, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, text), filter);

    const doneCount =
      todoData.filter(el => el.done).length;
    const toDoCount =
      todoData.filter(el => el.done === false).length;


    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}

        />
        <ItemAddForm
          addItem={this.addItem}
        />
      </div>
    );
  }
};
