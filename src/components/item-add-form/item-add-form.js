import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim() !== "") {
      this.props.addItem(this.state.label);
    }
    this.setState({
      label: ''
    })
  }



  render() {

    return (
      <form
        className="item-add-form input-group"
        onSubmit={this.onFormSubmit}

      >
        <input
          type="text"
          className="form-control"
          placeholder="Add todo"
          value={this.state.label}
          onChange={this.onInputChange}
        >
        </input>
        <button
          type="submit"
          className="btn btn-outline-secondary"
        >
          Add item
        </button>
      </form>
    );
  };
}