import React, { Component } from 'react';
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
    this.handleFormValues = this.getFormValues.bind(this)
    this.handleAddCustomer = this.addCustomer.bind(this)
  }

  getFormValues(e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy[e.target.id] = e.target.value
    this.setState(stateCopy)
  }

  addCustomer(e) {
    e.preventDefault()
    fetch('/api/addCustomer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        this.setState(this.state)
        this.props.getAllCustomers()
        this.props.handleClose()
      })
      .catch(err => {
        console.log(err)
      })
  }
  

  render () {
    return (
      <div className="CustomerForm">
        <form onSubmit={this.handleAddCustomer} className="CustomerForm__Form">
          <label htmlFor="firstName">
            First name
            <input id="firstName" onChange={this.handleFormValues} type="text"></input>
          </label>
          <label htmlFor="lastName">
            Last name
            <input id="lastName" onChange={this.handleFormValues} type="text"></input>
          </label>
          <label htmlFor="dateOfBirth">
            Date of birth
            <input id="dateOfBirth" onChange={this.handleFormValues} type="date"></input>
          </label>
          <label htmlFor="username">
            Username
            <input id="username" onChange={this.handleFormValues} type="text"></input>
          </label>
          <label htmlFor="password">
            Password
            <input id="password" onChange={this.handleFormValues} type="password"></input>
          </label>
          <input type="submit" value="Add"></input>
        </form>
      </div>
    )        
  }
}

export default CustomerForm;