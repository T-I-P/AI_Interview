import OpenAI from "openai";
import { useState } from "react";

const client = new OpenAI({
  apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
  dangerouslyAllowBrowser: true,
});

const Transcribe = async ({ audioFile }) => {
  const [transcription, setTranscription] = useState("");
  const transcript = await client.audio.transcriptions.create({
    model: "whisper-1",
    audio: audioFile,
  });
};

export default Transcribe;
