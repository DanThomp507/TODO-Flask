import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './App.css';
import TodoList from './components/TodoList'
import {
  getAll,
  addToList,
  updateStatus,
  deleteItem
} from './services/api';
import { FILTER_ALL } from './services/filters';
import { MODE_CREATE, MODE_NONE } from './services/modes';

class App extends Component {
  // intervalID;
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      list: [],
      filter: FILTER_ALL,
      mode: MODE_CREATE
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    let resp = getAll()
    resp.then(response => response.json())
      .then(data => {
        this.setState({
          list: data
        })
        // this.intervalID = setTimeout(this.fetchData.bind(this), 100);
      })
      // Catch any errors
      .catch(error => this.setState({ error, isLoading: false }));
  }

  addNew = (text) => {
    let response = addToList([...this.state.list], { Title: text, completed: false });
    response.then(response => response.json())
      .then(data => {
        let updatedList = [...this.state.list, ...data]
        this.setState({
          list: updatedList
        });
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));


  }

  changeStatus = (itemId, completed) => {
    updateStatus(itemId, completed)
      .then(response => response.json())
      .then(data => {
        // access data object
        for (let [key, value] of Object.entries(data)) {
          // if state doesn't include object value
          if (!this.state.list.includes(value)) {
            let updatedList = [...data, ...this.state.list]
            // filter to ensure there are no duplicates in state
            const uniqueItems = Array.from(new Set(updatedList.map(a => a.id)))
              .map(id => {
                return updatedList.find(a => a.id === id)
              })
            // sort by object id
            uniqueItems.sort((a, b) => a.id - b.id)
            // add updated list to state
            this.setState({
              list: uniqueItems
            })
          }
        }
      })
  }

  handleStatusChange = () => {
    this.props.history.push('/')
  }

  deleteItem = (itemId) => {
    let response = deleteItem(itemId);
    response.then(response => response.json())
      .then(data => {
        let updatedList = data
        this.setState({
          list: updatedList
        });

      })
  }
  changeFilter = (filter) => {
    this.setState({
      filter
    });
  }

  changeMode = (mode = MODE_NONE) => {
    this.setState({
      mode
    });
  }

  render() {
    return (
      <div className="container">
        <TodoList
          mode={this.state.mode}
          changeMode={this.changeMode}
          changeFilter={this.changeFilter}
          filter={this.state.filter}
          onSuccess={this.handleStatusChange}
          list={this.state.list}
          addNew={this.addNew}
          changeStatus={this.changeStatus}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default withRouter(App);
