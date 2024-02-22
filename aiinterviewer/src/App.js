import logo from './logo.svg';
import './App.css';
import RecordView from './components/record';
import React, {useState, useEffect} from 'react';

function App() {

  const [media, setMedia] = useState(null);

  useEffect(() => {
    console.log("main", media);
  }, [media]);

  return (
    <div className="App">
      <header className="App-header">
        <RecordView setMedia={setMedia} />
      </header>
    </div>
  );
}

export default App;
