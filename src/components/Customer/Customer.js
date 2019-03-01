import React, { Component } from 'react'
import './Customer.scss'
import CustomerListButtons from '../CustomerListButtons'

class Customer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditMode: false,
      areButtonsVisible: false
    }
    this.handleShowButtons = this.showButtons.bind(this)
    this.handleEditMode = this.enableEditMode.bind(this)
  }
  showButtons() {
    this.setState({
      areButtonsVisible: !this.state.areButtonsVisible
    })
  }
  enableEditMode() {
    this.setState({
      isEditMode: !this.state.isEditMode
    })
    console.log('click')
  }
  
  render() {
    const hiddenFields = ['password', 'deleted']
    const customerDetails = Object.keys(this.props.details).map((detail, index) => {
      if(!hiddenFields.includes(detail)) {
        return(
          <td key={index}>
            {this.props.details[detail]}
          </td>
        )
      } else {
        return null
      }
    }) 
    return (
      <tr>  
        { customerDetails }
        <CustomerListButtons 
          handleEditMode={this.handleEditMode}
          handleDelete={null}
        />
      </tr>
    )
  }
}

export default Customer
