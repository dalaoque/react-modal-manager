# react-modal-manager

## Usage

```js
import { Button, Modal } from 'antd'
import ReactModalManager, { showModal, closeModal } from '@momenta/react-modal-manager'

...

const DemoModal = ({ id, closeModal }) => (
  <Modal title="Basic Modal" visible={true} onOk={closeModal} onCancel={closeModal}>
    <p>Content...</p>
  </Modal>
)



const App = () => (
  <div>
    <Button onClick={() => showModal(<DemoModal />)}>Show Modal</Button>
    <ReactModalManager />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

or

const modalId = showModal(<DemoModal />)
closeModal(modalId)

...
```
