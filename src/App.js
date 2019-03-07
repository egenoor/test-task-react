import React from 'react'
import './App.scss'
import CustomerList from './components/CustomerList'
import Header from './components/Header'
import moment from 'moment'
window.moment = moment

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
    this.handleStopLoading = this.stopLoading.bind(this)
  }
  stopLoading() {
    this.setState({loading: false})
  }
  render() {
    return (
      <div className="App">
        { !this.state.loading &&
          <Header/>
        }
        <CustomerList handleStopLoading={this.handleStopLoading} />
      </div>
    )
  }
}

export default App
