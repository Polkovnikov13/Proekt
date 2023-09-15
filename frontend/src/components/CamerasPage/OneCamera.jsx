import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Card, CardText, CardTitle,
} from 'reactstrap';

export default function OneCamera({ OneCamera }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const clinkHandler = (id) => {
    navigate(`${id}`);
  };
  return (
    <div>
      <Card
        body
        className="my-2"
        style={{
          width: '18rem',
        }}
      >
        <CardTitle tag="h5">
          ID:
          {' '}
          {OneCamera?.id}
        </CardTitle>
        <CardText>
          Статус :
          {' '}
          {OneCamera?.['Статус камеры']}
        </CardText>
        <Button color="primary" onClick={() => clinkHandler(OneCamera?.id)}>
          {OneCamera?.['ссылка']}
        </Button>
      </Card>
    </div>
  );
}
