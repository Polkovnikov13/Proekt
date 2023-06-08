import React, { useCallback, useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,
} from 'reactstrap';

export default function MonitorModal({ toggle, modal }) {
  const [input, setInput] = useState('');
  // eslint-disable-next-line max-len
  const findHandler = useCallback((e) => setInput(e.target.value), []);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} style={{ left: '-30%', top: '28%' }}>
        <ModalHeader toggle={toggle}>Поиск</ModalHeader>
        <ModalBody>
          <Input
            style={{ width: '100%' }}
            type="text"
            id="finder"
            name="finder"
            value={input}
            placeholder="🔍  Наименование объекта"
            onChange={findHandler}
          />
          <ModalFooter className="d-flex justify-content-between">
            <div style={{ flex: 1 }}>
              <Button color="secondary" onClick={toggle} style={{ width: '100%' }}>
                Сбросить
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <Button color="primary" style={{ width: '100%' }}>
                Применить
              </Button>
            </div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
