import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

export default function MyFilters({ input }) {
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    const newArr = Object.keys(input).map((key, index) => ({
      id: index,
      name: input[key],
    }));
    setReasons(newArr.filter((el) => el.name !== '1'));
  }, [input]);

  function changeHandler2(num) {
    const newArr = reasons.filter((el) => el.id !== num);
    setReasons(newArr);
  }
  return (
    <div style={{
      display: 'flex', paddingTop: '12px', paddingBottom: '25px',
    }}
    >
      {reasons?.map((el) => (
        <Button
          key={el.id}
          outline
          style={{
            width: '250px', height: '45px', borderRadius: '25px', marginRight: '20px',
          }}
        >
          {el.name}
          <Button style={{ }} color="black" outline onClick={() => changeHandler2(el.id)}>
            ☓
          </Button>
        </Button>
      ))}
    </div>
  );
}
