import React from 'react'
import './CustomerListButtons.scss'

const CustomerListButtons = props => {
  return(
    <td className="CustomerListButtons">
      <div className="EditButtonContainer">
        <button onClick={props.handleEditMode}>Edit</button>
      </div>
      <div className="DeleteButtonContainer">
        <div className="DeleteButton" onClick={props.handleDelete}></div>
      </div>
    </td>
  )
}

export default CustomerListButtons