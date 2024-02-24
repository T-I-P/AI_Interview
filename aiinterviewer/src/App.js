import logo from "./logo.svg";
import "./App.css";
import RecordView from "./components/record";
import React, { useState, useEffect } from "react";
// import Transcribe from './components/transcribe';
import OpenAI from "openai";
import { toFile } from 'openai/uploads';

function App() {
  const client = new OpenAI({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const [audioFile, setMedia] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [transcript, setTranscript] = useState("");



useEffect(()=> {
  // console.log("audioData", audioData);
  if (audioData !== null) {
    // console.log("Here");
    setTranscript(client.audio.transcriptions.create({
      model: "whisper-1",
      file: toFile(audioData),
    }));
    if (transcript !== null) {
      console.log(transcript);
    }
    else{
      console.log("Transcript is null");
    }
    }
}, [audioData]);


const handleTranscribe = () => {
  fetch(audioFile)
  .then(response => response.blob())
  .then(blob => {
    console.log("blob", blob);
    // Create a FileReader
    const reader = new FileReader();
    // Read the blob as Data URL
    reader.readAsDataURL(blob)
    reader.onload = function() {
      setAudioData(blob);

      // console.log('Audio data:', audioData);
    };
  })
  .catch(error => {
    console.error('Error fetching the audio file:', error);
  });
  };

  useEffect(() => {
    if (audioFile !== null) {
      console.log("main", audioFile);
      // Transcribe(audioFile);
    }
  }, [audioFile]);

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
