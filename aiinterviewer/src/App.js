import "./App.css";
import RecordView from "./components/record";
import React, { useState, useEffect } from "react";
import OpenAI from "openai";


function App() {
  const client = new OpenAI({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const [audioFile, setMedia] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [transcript, setTranscript] = useState(null);



useEffect(()=> {

  if (audioData !== null) {
    const file = new File([audioData], 'voice.wav', { type: 'audio/wav' });
    
    client.audio.transcriptions.create({
        model: "whisper-1",
        file: file,
      }).then((res)=> {setTranscript(res.text); console.log(transcript)}).catch((err)=> console.log(err))

    }
}, [audioData]);

const handleTranscribe = () => {
  fetch(audioFile)
  .then(response => response.blob())
  .then(blob => {
    setAudioData(blob);
  })
  .catch(error => {
    console.error('Error fetching the audio file:', error);
  });
  };

  return (
    <div className="App">
      <header className="App-header">
        <RecordView setMedia={setMedia} />
        <button onClick={handleTranscribe}>Transcribe</button>
      </header>
    </div>
  );
}

export default App;
