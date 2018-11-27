import React from 'react'
import { createSubscription } from 'create-subscription'

class Manager {
  counter = 0
  modals = []
  add = modal => {
    const index = this.counter++
    const modalId = window.Symbol ? Symbol(index) : index
    const close = closeModal.bind(null, modalId)
    modal = React.cloneElement(modal, { key: index, closeModal: close })
    this.modals = this.modals.concat({ modalId, modal })
    this.onChanged(this.modals)
    return modalId
  }
  remove = modalId => {
    this.modals = this.modals.filter(p => p.modalId !== modalId)
    this.onChanged(this.modals)
  }

  removeAll = () => {
    this.modals = []
    this.onChanged(this.modals)
  }

  onChanged = () => {}
}

const manager = new Manager()

export const showModal = modal => {
  // console.log('showModal', modal, manager.modals)
  let el = modal
  if (!React.isValidElement(modal)) {
    el = () => modal
  }
  return manager.add(modal)
}

export const closeModal = modal_id => {
  // console.log('closeModal', modal_id)
  manager.remove(modal_id)
}

export const closeAllModals = () => {
  manager.removeAll()
}

const Subscription = createSubscription({
  getCurrentValue: manager => manager.modals,
  subscribe: (manager, callback) => {
    // console.log('subscribe')
    manager.onChanged = modals => {
      // console.log('onModalsChange', modals)
      callback(modals)
    }
    return () => {}
  }
})

export default () => <Subscription source={manager}>{modals => <React.Fragment>{modals.map(p => p.modal)}</React.Fragment>}</Subscription>
