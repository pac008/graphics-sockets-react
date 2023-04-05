import { type FC, useState, useContext } from 'react';
import { SocketContext } from '../../context/socket';


export const BandAdd: FC = () => {
  const [name, setName] = useState('');
  const {socket} = useContext(SocketContext);
  const onSubmit = (ev: any) => {
    ev.preventDefault();
    if (name.trim().length > 0) {
      socket.emit('add-band', {name});
      setName('');
    }
  };
  return (
    <>
      <h3>Add band</h3>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='new band name'
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
      </form>
    </>
  );
};
