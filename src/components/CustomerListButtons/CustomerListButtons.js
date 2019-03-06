import React from 'react'
import './CustomerListButtons.scss'

const CustomerListButtons = props => {
  return(   
      props.isEditVisible 
      ?
      <td className="CustomerListButtons">
        <div className="EditButtonContainer">
          <button name={props.id} onClick={props.handleEditCustomer}>Accept</button>
        </div>
      </td>
      : 
      <td className="CustomerListButtons">
        <div className="EditButtonContainer">
          <button name={props.id} onClick={props.handleEnableEditMode}>Edit</button>
        </div>
        <div className="DeleteButtonContainer">
          <div className="DeleteButton" id={props.id} onClick={props.handleDelete}></div>
        </div>
      </td>
  )
}

export default CustomerListButtons