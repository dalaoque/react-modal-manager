import React from 'react'
import { createSubscription } from 'create-subscription'

let modals = []

let counter = 0

let onModalsChange = () => {}

const createModalId = id => (window.Symbol ? Symbol(id) : id)

export function showModal(modal) {
  // console.log('showModal', modal, modals)
  let el = modal
  if (!React.isValidElement(modal)) {
    el = () => modal
  }
  const modal_id = counter++
  const symbol_modal_id = createModalId(modal_id)
  const close = closeModal.bind(null, symbol_modal_id)
  modal = React.cloneElement(modal, { key: modal_id, __modal_id: symbol_modal_id, closeModal: close })

  modals = modals.concat(modal)
  onModalsChange(modals)
  return symbol_modal_id
}

export function closeModal(modal_id) {
  // console.log('closeModal', modal_id)
  modals = modals.filter(p => p.props.__modal_id !== modal_id)
  onModalsChange(modals)
}

const ModalSubscription = createSubscription({
  getCurrentValue: _ => modals,
  subscribe: (_, callback) => {
    // console.log('subscribe')
    onModalsChange = modals => {
      // console.log('onModalsChange', modals)
      callback(modals)
    }
    return () => {}
  }
})

export default props => (
  <ModalSubscription source={modals}>
    {modals => (
      <div className={props.className} style={props.style}>
        {modals}
      </div>
    )}
  </ModalSubscription>
)
