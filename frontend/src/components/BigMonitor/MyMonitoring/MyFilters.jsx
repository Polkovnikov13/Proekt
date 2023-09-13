import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { setMapName } from '../../../redux/Slices/mapSlice';

export default function MyFilters({ input }) {
  const [reasons, setReasons] = useState([]);
  const mapiName = useSelector((state) => state.mapSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const newArr = Object.keys(input).map((key, index) => ({
      id: index,
      name: input[key],
    }));
    setReasons(newArr.filter((el) => el.name !== '1'));
  }, [input]);
  const rfArr = reasons.filter((el) => el.id === 1);

  function changeHandler2(num) {
    const newArr = reasons.filter((el) => el.id !== num);
    setReasons(newArr);
  }
  return (
    <div style={{
      display: 'flex', paddingTop: '12px', paddingBottom: '25px',
    }}
    >
      {rfArr[0]?.name !== 'Российская Федерация' && reasons?.map((el) => (
        <Button
          key={el.id}
          outline
          style={{
            width: '250px', height: '45px', borderRadius: '25px', marginRight: '20px',
          }}
        >
          {el.name}
          <Button
            style={{ }}
            color="black"
            outline
            onClick={() => {
              dispatch(setMapName('Российская Федерация'));
              changeHandler2(el.id);
            }}
          >
            ☓
          </Button>
        </Button>
      ))}
    </div>
  );
}
