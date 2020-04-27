import React, { Component } from 'react';
import { Link, Route, withRouter } from "react-router-dom";
import './App.css';

import {
  getAll,
  addToList,
  updateStatus,
  deleteItem
} from './services/api';

import { FILTER_ALL } from './services/filters';

import {
  MODE_CREATE,
  MODE_NONE
} from './services/modes';

import TodoList from './components/TodoList';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: FILTER_ALL,
      mode: MODE_CREATE,
      registerFormData: {
        username: "",
        email: "",
        password: "",
        isLocal: "",
        avatar: ""
      },
      currentUser: null,
      toggleLogin: true,
      loginFormData: {
        email: "",
        password: ""
      },
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

  handleLoginClick = (e) => {
    e.preventDefault();
    console.log("I want to register: handleLoginClick button".toggleLogin);
    this.setState((prevState, newState) => ({
      toggleLogin: !prevState.toggleLogin
    }));
  }

  render() {
    return (
      <div className="container">
        <Route
          exact
          path="/"
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                email={this.state.loginFormData.email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
              <RegisterForm
                {...props}
                userData={""}
                title={"Register User"}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                email={this.state.registerFormData.email}
                avatar={this.state.registerFormData.avatar}
                isLocal={this.state.registerFormData.isLocal}
                password={this.state.registerFormData.password}
                submitButtonText="Submit"
                backButtonText="Back to Login"
                passwordAsk={"y"}
                toggleLocal={this.state.handleToggleLocalRegister}
              />
            </>
          )}
        />

        <Route
          exact
          path="/home"
          render={props => (
            <TodoList
              {...props}
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
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
