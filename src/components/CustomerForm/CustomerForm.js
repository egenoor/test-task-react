import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import './CustomerForm.scss'

class CustomerForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      username: '',
      password: ''
    }
    this.validator = new SimpleReactValidator()
    this.handleFormValues = this.getFormValues.bind(this)
    this.handleAddCustomer = this.addCustomer.bind(this)
  }

  getFormValues(e) {
    let stateCopy = Object.assign({}, this.state)
    stateCopy[e.target.id] = e.target.value
    if(e.target.id === 'dateOfBirth'){
      const date = window.moment(e.target.value, 'YYYY-MM-DD')
      stateCopy.dateOfBirth = date
    }
    this.setState(stateCopy)
  }

  addCustomer(e) {
    e.preventDefault()
    const { firstName, lastName, username, password } = this.state
    if (this.validator.allValid()) {
      fetch('/api/addCustomer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          dateOfBirth: this.state.dateOfBirth.format('YYYY-MM-DD')
        })
      })
        .then(res => {
          this.setState(this.state)
          this.props.getAllCustomers()
          this.props.handleClose()
        })
        .catch(err => {
          console.log(err)
        })      
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  }

  render () {
    return (
      <div className="CustomerForm">
        <form onSubmit={this.handleAddCustomer} className="CustomerForm__Form">
          <label htmlFor="firstName">
            First name
            <input id="firstName" onChange={this.handleFormValues} type="text"/>
            {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
          </label>
          <label htmlFor="lastName">
            Last name
            <input id="lastName" onChange={this.handleFormValues} type="text"/>
            {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
          </label>
          <label htmlFor="dateOfBirth">
            Date of birth
            <input id="dateOfBirth" onChange={this.handleFormValues} type="date"/>
            {this.validator.message('dateOfBirth', this.state.dateOfBirth, 'required|date')}
          </label>
          <label htmlFor="username">
            Username
            <input id="username" onChange={this.handleFormValues} type="text" />
            {this.validator.message('username', this.state.username, 'required')}
          </label>
          <label htmlFor="password">
            Password
            <input id="password" onChange={this.handleFormValues} type="password"/>
            {this.validator.message('password', this.state.password, 'required|alpha_num_dash|min:8|max:32')}
          </label>
          <input type="submit" value="Add"/>
        </form>
      </div>
    )        
  }
}

export default CustomerForm;