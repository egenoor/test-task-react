import React, { Component } from 'react'
import './Customer.scss'
import CustomerListButtons from '../CustomerListButtons'
import SimpleReactValidator from 'simple-react-validator'

class Customer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditVisible: false,
      areButtonsVisible: false,
      id: this.props.details.id,
      firstName: this.props.details.firstName,
      lastName: this.props.details.lastName,
      dateOfBirth: this.props.details.dateOfBirth,
      momentDateOfBirth: window.moment(this.props.details.dateOfBirth, 'YYYY-MM-DD'),
      username: this.props.details.username
    }
    this.rules = {
      firstName: 'required|alpha',
      lastName: 'required|alpha',
      dateOfBirth: 'required|date',
      username: 'required|alpha_num'
    }
    this.validator = new SimpleReactValidator({
      messages: {
        alpha: 'Only letters allowed',
        date: 'Must be a date',
        required: 'Field is required',
        alpha_num: 'Must be alphanumerical'
      }
    })
    this.handleShowButtons = this.showButtons.bind(this)
    this.handleFormValues = this.getFormValues.bind(this)
    this.handleEnableEditMode = this.enableEditMode.bind(this)
    this.handleEditCustomer = this.editCustomer.bind(this)
  }

  showButtons() {
    this.setState({
      areButtonsVisible: !this.state.areButtonsVisible
    })
  }

  enableEditMode() {
    this.setState({
      isEditVisible: !this.state.isEditVisible
    })
  }

  editCustomer(e) {
    e.preventDefault()
    const { id, firstName, lastName, username} = this.state
    if (this.validator.allValid()) {
      fetch('/api/editCustomer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          firstName,
          lastName,
          username,
          dateOfBirth: this.state.momentDateOfBirth.format('YYYY-MM-DD')
        })
      })
        .then(res => {
          this.setState(this.state)
          this.enableEditMode()
          this.props.getAllCustomers()
        })
        .catch(err => {
          console.log(err)
        })      
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  getFormValues(e) {
    let stateCopy = Object.assign({}, this.state)
    stateCopy[e.target.getAttribute('name')] = e.target.value
    if(e.target.getAttribute('name') === 'dateOfBirth'){
      const date = window.moment(e.target.value, 'YYYY-MM-DD')
      stateCopy[e.target.getAttribute('name')] = e.target.value
      stateCopy.momentDateOfBirth = date
    }
    this.setState(stateCopy)
  }
  
  render() {
    const hiddenFields = ['password', 'deleted']
    const customerDetails = Object.keys(this.props.details).map((detail, index) => {
      if(!hiddenFields.includes(detail)) {
        if(this.state.isEditVisible) {
          if (detail === 'id') {
            return(
              <td key={index}>
                {this.props.details[detail]}
              </td>
            ) 
          }
          return(
            <td key={index}>
              <input 
                name={detail}
                onChange={this.handleFormValues}
                type={detail === 'dateOfBirth' ? 'date' : 'text'} 
                value={this.state[detail]} />
                {this.validator.message(
                  detail, 
                  detail === 'dateOfBirth' ? this.state.momentDateOfBirth : this.state[detail], 
                  this.rules[detail]
                  )}
            </td>
          )
        } else {
          return(
            <td key={index}>
              {this.props.details[detail]}
            </td>
          )
        }        
      } else {
        return null
      }
    })

    return (
      <tr>  
        { customerDetails }
        <CustomerListButtons
          isEditVisible={this.state.isEditVisible}
          handleEnableEditMode={this.handleEnableEditMode}
          handleEditCustomer={this.handleEditCustomer}
          handleDelete={this.props.handleDeleteCustomer}
          id={this.state.id}
        />
      </tr>
    )
  }
}

export default Customer
