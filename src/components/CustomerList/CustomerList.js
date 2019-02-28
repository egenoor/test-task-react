import React, { Component } from 'react'
import './CustomerList.scss'
import Customer from '../Customer'

class CustomerList extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: []
    }
    this.getCustomers()
  }
  getCustomers () {
    fetch('/api/getAllCustomers')
      .then(customers => customers.json())
      .then(customers => {
        this.setState({
          customers
        })
      })
  }
  render () {
    let tableHeaders
    const hiddenFields = ['password', 'deleted']
    const listItems = this.state.customers.map((customer, key) =>
      <Customer key={key} details={customer} />
    )

    if (this.state.customers.length > 0) {
      tableHeaders = Object.keys(this.state.customers[0]).map((header, index) => {
        if(!hiddenFields.includes(header)) {
          return (
            <th key={index}>
              {header}
            </th>
          )
        } else {
          return null
        }
      })
    } else {
      tableHeaders = null
    }

    return (
      <div className="CustomerList">
        <table>
          <thead>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomerList