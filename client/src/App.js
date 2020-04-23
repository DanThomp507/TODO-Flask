import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList'
import {
  getAll,
  addToList,
  updateStatus,
  deleteItem
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

  addNew = (text) => {
    console.log(text)
    let response = addToList(this.state.list, { text, completed: false });
    response.then(response => response.json())
      .then(data => {
        console.log(data)
        let updatedList = [...this.state.list, ...data]
        this.setState({ 
          list: updatedList 
        });

      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));


  }

  changeStatus = (itemId, completed) => {
    let response = updateStatus(itemId, completed);
    response.then(response => response.json())
      .then(data => {
        let updatedList = [...this.state.list, ...data]
        this.setState({ 
          list: updatedList 
        });

      })
  }

  deleteItem = (itemId) =>  {
    let response = deleteItem(itemId);
    response.then(response => response.json())
      .then(data => {
        let updatedList = data
        this.setState({ 
          list: updatedList 
        });

      })
  }

  render() {
    return (
      <div className="container">
        <TodoList
          list={this.state.list} 
          addNew={this.addNew}
          changeStatus={this.changeStatus}
          deleteItem={this.deleteItem}
          />
      </div>
    );
  }
}

export default App;
