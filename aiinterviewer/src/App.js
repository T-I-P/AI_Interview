import logo from "./logo.svg";
import "./App.css";
import RecordView from "./components/record";
import React, { useState, useEffect } from "react";
// import Transcribe from './components/transcribe';
import OpenAI from "openai";
import { toFile } from 'openai/uploads';
// const fs = require('fs')

function App() {
  const client = new OpenAI({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const [audioFile, setMedia] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [transcript, setTranscript] = useState(null);



useEffect(()=> {
  // console.log("audioData", audioData);
  if (audioData !== null) {
    // console.log("Here");
    // console.log(client.audio.transcriptions)
    // console.log(audioFile)
    
    // toFile(audioData).then((file)=>{
    // setTranscript(client.audio.transcriptions.create({
    //   model: "whisper-1",
    //   file: file,
    // }))}).catch((error)=>{console.log(error)})

    // Method 2
    const file = new File([audioData], 'voice.wav', { type: 'audio/wav' });
    
    client.audio.transcriptions.create({
        model: "whisper-1",
        file: file,
      }).then((res)=> {setTranscript(res.text); console.log(transcript)}).catch((err)=> console.log(err))

    }
}, [audioData]);

// useEffect(() => {
//   if (audioData !== null) {
//     const formData = new FormData();
//     formData.append('model', "whisper-1");
//     formData.append('file', audioData, "audio-file");

//     client.audio.transcriptions.create(formData)
//       .then(response => {
//         setTranscript(response.data.id);
//         console.log(response.data.id);
//       })
//       .catch(error => {
//         console.error('Error transcribing audio:', error);
//       });
//   }
// }, [audioData, client.audio.transcriptions]);



const handleTranscribe = () => {
  fetch(audioFile)
  .then(response => response.blob())
  .then(blob => {
    // console.log("blob", blob);
    setAudioData(blob);
    // Create a FileReader
    const reader = new FileReader();
    // Read the blob as Data URL
    reader.readAsDataURL(blob)
    // reader.onload = function() {
      
    //   // console.log("Line  72")
    //   //setAudioData(reader.result)
    //   //console.log('Audio data:', audioData);
    // };
  })
  .catch(error => {
    console.error('Error fetching the audio file:', error);
  });
  };

  // useEffect(() => {
  //   if (audioFile !== null) {
  //     console.log("main", audioFile);
  //     // Transcribe(audioFile);
  //   }
  // }, [audioFile]);

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
