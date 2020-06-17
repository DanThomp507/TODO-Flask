import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import './App.css';

import {
  getAll,
  addToList,
  updateStatus,
  deleteItem,
  loginUser,
  registerUser
} from './services/api';

import { FILTER_ALL } from './services/filters';

import {
  MODE_CREATE,
  MODE_NONE
} from './services/modes';

import TodoList from './components/TodoList';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';
import LogoutForm from './components/forms/LogoutForm';
import FormatFormErrors from './components/forms/FormatFormErrors';

const FORM_FIELDS = [
  'Name',
  'Email',
  'password'
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      errors: FormatFormErrors(null, FORM_FIELDS),
      formFields: FORM_FIELDS,
      filter: FILTER_ALL,
      mode: MODE_CREATE,
      registerFormData: {
        Name: '',
        Email: '',
        password: ''
      },
      currentUser: null,
      userData: null,
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
        console.log(response, 'RESPONSE')
        if(!response.error){
          let userData = {
              id: response.data.userData.id,
              Name: response.data.userData.Name,
              Email: response.data.userData.Email,
              CreatedOn: response.data.userData.CreatedOn
          }
          localStorage.setItem('usertoken', response.data.access_token)
          localStorage.setItem('userData', JSON.stringify(userData))
          this.props.history.push(`/home`)
        }
        return response
      })
      .catch(err => {
        console.log(err)
      })
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
    console.log('handleRegisterChange name, val', name, value);
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  handleRegister = (e) => {
    e.preventDefault()

    const data = {
      Name: this.state.registerFormData.Name,
      Email: this.state.registerFormData.Email,
      password: this.state.registerFormData.password
    }
  
    let response = registerUser(data)
    response.then(response => {
      console.log(response, 'REGISTER RESPONSE')
      if(!response.error){
        let userData = {
          id: response.data.userData.id,
          Name: response.data.userData.Name,
          Email: response.data.userData.Email,
          CreatedOn: response.data.userData.CreatedOn
      }
        localStorage.setItem('usertoken', response.data.access_token)
        localStorage.setItem('userData', JSON.stringify(userData))
        this.props.history.push(`/home`)
      }
      return response
    })
    .catch(err => {
      console.log(err)
      switch (err.response.body.code) {
      case 'app.logic.error':
        //  General error
        console.log(err.response.body.message)
        break

      case 'api.error.validation':
        // Update the state with the errors, using _formatFormErrors
        this.setState({
          errors: FormatFormErrors(err, this.state.formFields)
        })

        if (typeof err.response.body.errors === 'string') {
          console.log(err.response.body.errors)
        } else {
          console.log('error')
        }
        break
      }
    })
  }

  handleLogout = () =>  {
    localStorage.removeItem('userData');
    localStorage.removeItem('usertoken');
    this.setState({
      currentUser: null,
      toggleLogin: true,
      userData: null,
      loginFormData: '',
      registerFormData: ''
    });
    this.props.history.push(`/`);
  }



  render() {
    const { errors } = this.state
    console.log(errors)
    return (
      <div className='container'>
        <Route
          exact
          path='/'
          render={props => (
            <>
              <LoginForm
                {...props}
                errors={errors}
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
                errors={errors}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleRegisterFormChange}
                onSubmit={this.handleRegister}
                Name={this.state.registerFormData.Name}
                Email={this.state.registerFormData.Email}
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

        <Route
          exact
          path='/logout'
          render={props => (
            <LogoutForm {...props} handleLogout={this.handleLogout} />
          )}
        />

        {/* <AppFooter
          handleLogout={this.handleLogout}
          show={this.state.currentUser}
          userData={this.state.userData}
        /> */}

      </div>
    );
  }
}

export default withRouter(App);
