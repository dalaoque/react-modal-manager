import ReactDOM from 'react-dom'
import { Button, Modal } from 'antd'
import ModalManager, { showModal } from '@momenta/react-modal-manager'
import 'antd/dist/antd.css'

let index = 1

const DemoModal = ({ id, closeModal }) => (
  <Modal title="Basic Modal" visible={true} onOk={closeModal} onCancel={closeModal}>
    <p>Modal {id}</p>
  </Modal>
)

const App = () => (
  <div>
    <Button onClick={() => showModal(<DemoModal id={index++} />)}>Add Modal</Button>
    <ModalManager />
  </div>
)

window.showModal = () => showModal(<DemoModal id={index++} />)

ReactDOM.render(<App />, document.getElementById('root'))
