import logo from "./logo.svg";
import "./App.css";
import RecordView from "./components/record";
import React, { useState, useEffect } from "react";
// import Transcribe from './components/transcribe';
import OpenAI from "openai";

function App() {
  const client = new OpenAI({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const [audioFile, setMedia] = useState(null);
  const [transcript, setTranscript] = useState("");

  const handleTranscribe = async () => {
    console.log("Here");
    const setTranscript = await client.audio.transcriptions.create({
      model: "whisper-1",
      audio: "aiinterviewer/src/sample.mp3",
    });
    console.log("Transcribing", transcript);
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
