import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList'
import {
  getAll,
  addToList,
  updateStatus,
  deleteItemService
} from './services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    let resp = getAll()
    resp.then(response => response.json())
      .then(data => {
        this.setState({ 
          list: data 
        })
      })
      // Catch any errors
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
      <div className="container">
        <TodoList 
        list={this.state.list}/>
      </div>
    );
  }
}

export default App;
