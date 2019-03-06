import React from 'react'
import './App.scss'
import CustomerList from './components/CustomerList'
import Header from './components/Header'
import Footer from './components/Footer'
import moment from 'moment'
window.moment = moment

const App = () => {
  return (
    <div className="App">
      <Header/>
      <CustomerList/>
      <Footer/>
    </div>
  )
}

export default App
