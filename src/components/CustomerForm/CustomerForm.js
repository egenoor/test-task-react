import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import moment from 'moment'
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
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy[e.target.id] = e.target.value
    if(e.target.id === 'dateOfBirth'){
      const date = moment(e.target.value, 'YYYY-MM-DD')
      stateCopy[e.target.id] = date
      console.log(date.isValid())
    }
    this.setState(stateCopy)
  }

  addCustomer(e) {
    e.preventDefault()
    if (this.validator.allValid()) {
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
            <input id="firstName" onChange={this.handleFormValues} type="text"></input>
            {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
          </label>
          <label htmlFor="lastName">
            Last name
            <input id="lastName" onChange={this.handleFormValues} type="text"></input>
            {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
          </label>
          <label htmlFor="dateOfBirth">
            Date of birth
            <input id="dateOfBirth" onChange={this.handleFormValues} type="date"></input>
            {this.validator.message('dateOfBirth', this.state.dateOfBirth, 'required|date')}
          </label>
          <label htmlFor="username">
            Username
            <input id="username" onChange={this.handleFormValues} type="text"></input>
            {this.validator.message('username', this.state.username, 'required')}
          </label>
          <label htmlFor="password">
            Password
            <input id="password" onChange={this.handleFormValues} type="password"></input>
            {this.validator.message('password', this.state.password, 'required|alpha_num_dash|min:8|max:32')}
          </label>
          <input type="submit" value="Add"></input>
        </form>
      </div>
    )        
  }
}

export default CustomerForm;