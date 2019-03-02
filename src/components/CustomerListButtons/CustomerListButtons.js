import React from 'react'
import './CustomerListButtons.scss'

const CustomerListButtons = props => {
  return(
    <td className="CustomerListButtons">
      <div className="EditButtonContainer">
        <button name={props.username} onClick={props.handleEditMode}>Edit</button>
      </div>
      <div className="DeleteButtonContainer">
        <div className="DeleteButton" name={props.username} onClick={props.handleDelete}></div>
      </div>
    </td>
  )
}

export default CustomerListButtons