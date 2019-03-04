import React from 'react'
import './Modal.scss'

const Modal = ({ handleClose, content }) => {

  return (
    <div className="Modal">
      <section className="Modal__Main">
        <div className="CloseButtonContainer">
          <button className="CloseButton" onClick={handleClose}></button>
        </div>
        {content}
      </section>
    </div>
  )
}

export default Modal