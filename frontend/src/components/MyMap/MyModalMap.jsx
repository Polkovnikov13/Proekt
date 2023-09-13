import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col,
} from 'reactstrap';

export default function MyModalMap({ modal, setModal, name }) {
  const exampl = useSelector((state) => state.example.array1);
  const mapiName = useSelector((state) => state.mapSlice);
  const targetMap = exampl.filter((oneReg) => {
    if (mapiName && mapiName !== 'Российская Федерация') {
      return oneReg.NAME === mapiName;
    }
    return oneReg.NAME === 'Российская Федерация';
  });
  const firstTable = targetMap.filter((obj) => obj['ID Подкатегории'] === '' && obj['Наименование Категории'] === 'Все категории');
  const toggle = () => setModal(!modal);
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
            <p>
              {' '}
              { firstTable && firstTable[0] ? firstTable[0]['1_Построено'] : null}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Запланировано:</p>
            <p>{ firstTable && firstTable[0] ? firstTable[0]['1_Строительство'] : null}</p>
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
