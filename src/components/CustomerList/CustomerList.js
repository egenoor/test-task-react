import React, { Component } from 'react'
import './CustomerList.scss'
import Customer from '../Customer'
import testCustomers from '../../data/customers.json'
import AddCustomerButton from '../AddCustomerButton'
import CustomerForm from '../CustomerForm'
import Modal from '../Modal'
import Loader from '../Loader'

class CustomerList extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: [],
      isModalVisible: false,
      loading: true
    }
    this.handleDeleteCustomer = this.deleteCustomer.bind(this)
    this.handleToggleModal = this.toggleModal.bind(this)
    this.handleGetCustomers = this.getCustomers.bind(this)
  }

  componentDidMount() {
    this.getCustomers()
      .then(res => {
        if(this.state.customers.length < 1){
          this.addDummyData()
          this.getCustomers()
        }
        this.setState({loading: false})
      }) 
  }

  toggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  addDummyData () {
    testCustomers.forEach(async customer => {
      await window.fetch('/api/addCustomer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
    })
  }

  deleteCustomer (e) {
    let customersCopy = [...this.state.customers] 
    const id = e.target.id
    const match = customersCopy.filter(customer => customer.id.toString() === id)[0]
    const index = customersCopy.indexOf(match)
    if (index !== -1) {
      customersCopy.splice(index, 1)
      fetch('/api/deleteCustomer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
        .then(res => {
          this.setState({customers: customersCopy})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  getCustomers () {
    return fetch('/api/getAllCustomers')
      .then(customers => customers.json())
      .then(customers => {
        this.setState({
          customers
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  formatText(text) {
    let count = 0
    const words = text.split(/(?=[A-Z])/).map(word => {
      count++
      if (count === 1) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      } else {
        return word.toLowerCase()
      }
    })
    return words.join(' ')
  }

  render () { 
    let tableHeaders
    const hiddenFields = ['password', 'deleted']
    const customers = this.state.customers.map((customer, index) =>
      <Customer 
        key={index} 
        details={customer}
        getAllCustomers={this.handleGetCustomers}
        handleDeleteCustomer={this.handleDeleteCustomer}
      />
    )
    if (this.state.customers.length > 0) {
      tableHeaders = Object.keys(this.state.customers[0]).map((header, index) => {
        if(!hiddenFields.includes(header)) {
          return (
            <th key={index}>
              {this.formatText(header)}
            </th>
          )
        } else {
          return null
        }
      })
    } else {
      tableHeaders = null
    }

    if (!this.state.loading) {
      return (
          <div className="CustomerList">
            <table>
              <thead>
                <tr>
                  {tableHeaders}
                  <AddCustomerButton 
                    handleToggleModal={this.handleToggleModal}
                  />
                </tr>
              </thead>
              <tbody>
                {customers}
              </tbody>
            </table>
            {this.state.isModalVisible &&
              <Modal 
                handleClose={this.handleToggleModal}
                content={
                  <CustomerForm
                    handleClose={this.handleToggleModal}
                    getAllCustomers={this.handleGetCustomers}
                  />}
              />}
        </div>      
      )
    } else {
      return <Loader/>
    }
  }
}

export default CustomerList