import React from 'react'
import './AddCustomerButton.scss'

const AddCustomerButton = props => {
  return(
    <th className="AddCustomerButton">
        <button onClick={props.handleToggleModal}>Add</button>
    </th>
  )
}

export default AddCustomerButton