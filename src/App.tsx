import { useContext } from 'react';
import { BandAdd } from './components/bandAdd';
import { BandList } from './components/bandList';
import { SocketContext } from './context/socket';
import { BandGrafic } from './components/bandGrafic';

function App() {
  const { isOnline } = useContext(SocketContext);

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {isOnline ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </p>
      </div>
      <h1>Band names</h1>
      <hr />
      <div className="row">
        <div className="col">
          <BandGrafic />
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          <BandList />
        </div>
        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
