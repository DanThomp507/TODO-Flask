import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import './App.css';

import {
  getAll,
  addToList,
  updateStatus,
  deleteItem,
  loginUser
} from './services/api';

import { FILTER_ALL } from './services/filters';

import {
  MODE_CREATE,
  MODE_NONE
} from './services/modes';

import TodoList from './components/TodoList';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: FILTER_ALL,
      mode: MODE_CREATE,
      registerFormData: {
        username: '',
        Email: '',
        password: ''
      },
      currentUser: null,
      toggleLogin: true,
      loginFormData: {
        Email: '',
        password: ''
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
    console.log(response)
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
    console.log('I want to register: handleLoginClick button'.toggleLogin);
    this.setState((prevState, newState) => ({
      toggleLogin: !prevState.toggleLogin
    }));
  }

  handleLogin = (e) => {
      e.preventDefault()
  
      const data = {
        Email: this.state.loginFormData.Email,
        password: this.state.loginFormData.password
      }
    
      let response = loginUser(data)
      response.then(response => {
        localStorage.setItem('usertoken', response.data.access_token)
        return response
      })
      .catch(err => {
        console.log(err)
      })
      this.props.history.push(`/home`)
      // response.then(data => {
      //   if (!data.error) {
      //     this.props.history.push(`/home`)
      //   }
      // })
    }


  handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
    console.log(this.state.loginFormData, 'LOGIN STATE')
  }


  handleRegisterFormChange = (e) => {
    const { name, value } = e.target;
    console.log("handleRegisterChange name, val", name, value);
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }


  render() {
    return (
      <div className='container'>
        <Route
          exact
          path='/'
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                Email={this.state.loginFormData.Email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
              <RegisterForm
                {...props}
                userData={''}
                title={'Register User'}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                Email={this.state.registerFormData.Email}
                avatar={this.state.registerFormData.avatar}
                isLocal={this.state.registerFormData.isLocal}
                password={this.state.registerFormData.password}
                submitButtonText='Submit'
                backButtonText='Back to Login'
                passwordAsk={'y'}
                toggleLocal={this.state.handleToggleLocalRegister}
              />
            </>
          )}
        />

        <Route
          exact
          path='/home'
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
