import {
  type FC,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';
import { SocketContext } from '../../context/socket';
import { type Band } from '../../models/band';

export const BandList: FC = () => {
  const { socket } = useContext(SocketContext);

  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on('current-bands', data => {
      setBands(data);
    });
    return () => {
      socket.off('current-bands');
    };
  }, [socket]);

  const changeName = (ev: ChangeEvent<HTMLInputElement>, id: number) => {
    const newName = ev.target.value;

    setBands(b =>
      b.map(band => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const vote = (id: number): void => {
    socket.emit('vote-band', id);
  };

  const removeBand = (id: number): void => {
    socket.emit('remove-band', id);
  };
  const changeNameById = (id: number, name: string): void => {
    socket.emit('change-name-band', { id, name });
  };

  const onBlurName = (id: number, name: string): void => {
    changeNameById(id, name);
  };

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th>Vote</th>
            <th>Name</th>
            <th>Votes</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {bands?.length > 0 &&
            bands.map(({ id, name, votes }) => (
              <tr key={id}>
                <td>
                  <button className='btn btn-primary' onClick={() => vote(id)}>
                    +1
                  </button>
                </td>
                <td>
                  <input
                    type='text'
                    onChange={ev => changeName(ev, id)}
                    value={name}
                    className='form-control'
                    onBlur={() => onBlurName(id, name)}
                  />
                </td>
                <td>
                  <h3>{votes}</h3>
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeBand(id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
