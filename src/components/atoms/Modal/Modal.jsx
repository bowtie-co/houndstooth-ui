import React from 'react'
import { Modal as ModalRS, ModalHeader } from 'reactstrap'

// import styles from './Button.scss'

const Modal = ({ toggle, isOpen, backdrop = true, children, title }) => {
  return (
    <ModalRS isOpen={isOpen} toggle={() => toggle(false)} backdrop={backdrop}>
      { title && <ModalHeader toggle={() => toggle(false)}>{ title }</ModalHeader> }
      { children }
    </ModalRS>
  )
}

export default Modal
