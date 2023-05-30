import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col,
} from 'reactstrap';

export default function MyModalMap({ modal, setModal, name }) {
  // const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log(name);
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>
        Click Me
      </Button> */}
      {/* <Modal isOpen={modal} toggle={toggle} {...args}> Вдруг поработаем с пропсами */}
      <Modal centered style={{ width: '330px', height: '710px' }} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{name}</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Построено  объектов:</p>
            <p>2045</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Запланировано:</p>
            <p>5246</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} style={{ width: '100%' }}>
            Показать
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
