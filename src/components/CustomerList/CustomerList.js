import React, { Component } from 'react'
import './CustomerList.scss'

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
          customers: customers
        })
      })
  }
  render () {
    return (
      <div className="CustomerList">
        { 
          this.state.customers.map((customer, key) => {
            const { username, firstName, lastName } = customer
            return (
              <div key={key}>
                <p>{ username }</p>
                <p>{ firstName }</p>
                <p>{ lastName }</p>
              </div>
            )
          }) 
        }
      </div>
    );
  }
}

export default CustomerList