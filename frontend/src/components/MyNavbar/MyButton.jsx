/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, Modal, ModalFooter, FormGroup, Label, Input, Form,
} from 'reactstrap';

export default function MyButton({ changeHandler, input, setInput }) {
  const [modal, setModal] = useState(false);
  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  const clearHandler = () => {
    setInput({
      money: '1', region: '1', role: '1', finance: '1',
    });
    setModal(!modal);
  };
  console.log(input, '<---');

  // console.log(input);
  // const changeHandler = useCallback((e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), []);
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Button color="primary" onClick={toggle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
        </svg>
        {' '}
        Фильтры
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <FormGroup className="d-flex justify-content-between align-items-center">
          <Label for="money" style={{ marginTop: '12px', paddingLeft: '10px' }}>Ед. измерения</Label>
          <Input
            className="mx-2 text-right"
            style={{
              width: '275px', paddingLeft: '10px', paddingRight: '10px', marginTop: '12px',
            }}
            type="select"
            id="money"
            name="money"
            placeholder="трл. руб"
            onChange={changeHandler}
          >
            <option value="Муж">Муж</option>
            <option value="Жен">Жен</option>
          </Input>
        </FormGroup>
        <FormGroup className="d-flex justify-content-between align-items-center">
          <Label for="region" style={{ paddingLeft: '10px' }}>Регион</Label>
          <Input
            className="mx-2 text-right"
            style={{ width: '275px', paddingLeft: '10px', paddingRight: '10px' }}
            type="select"
            id="region"
            name="region"
            placeholder="трл. руб"
            onChange={changeHandler}
          >
            <option value="No">No</option>
            <option value="Северо-Западный ФО">Северо-Западный ФО</option>
          </Input>
        </FormGroup>
        <FormGroup className="d-flex justify-content-between align-items-center">
          <Label for="role" style={{ paddingLeft: '10px' }}>Роль</Label>
          <Input
            className="mx-2 text-right"
            style={{ width: '275px', paddingLeft: '10px', paddingRight: '10px' }}
            type="select"
            id="role"
            name="role"
            placeholder="трл. руб"
            onChange={changeHandler}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Input>
        </FormGroup>
        <FormGroup className="d-flex justify-content-between align-items-center">
          <Label for="finance" style={{ paddingLeft: '10px' }}>Финансирование</Label>
          <Input
            className="mx-2 text-right"
            style={{ width: '275px', paddingLeft: '10px', paddingRight: '8px' }}
            type="select"
            id="finance"
            name="finance"
            placeholder="трл. руб"
            onChange={changeHandler}
          >
            <option value="false">No</option>
            <option value="Региональный бюджет">Региональный бюджет</option>
          </Input>
        </FormGroup>
        <ModalFooter className="d-flex justify-content-between">
          <div style={{ flex: 1 }}>
            <Button color="secondary" onClick={clearHandler} style={{ width: '100%' }}>
              Сбросить
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Button color="primary" onClick={toggle} style={{ width: '100%' }}>
              Применить
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </Form>
  );
}
