import React, { Component } from 'react'
import './Customer.scss'
 
class Customer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isVisible: false
    }
    console.log(this.props)
    this.showHandler = this.show.bind(this)
  }

  show () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    const hiddenFields = ['password', 'deleted']
    const details = Object.keys(this.props.details).map((key, index) => {
      if(!hiddenFields.includes(key)) {
        return(
          <td key={index}>
            {this.props.details[key]}
          </td>
        )
      } else {
        return null
      }
    })

    return (
      <tr>  
        { details }
      </tr>
    )
  }
} 

export default Customer
