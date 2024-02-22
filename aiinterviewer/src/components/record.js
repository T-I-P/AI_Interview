import { ReactMediaRecorder, startRecording, stopRecording, mediaBlobUrl } from "react-media-recorder";
import React, { useRef } from "react";

const RecordView = ({setMedia}) => {
    const mediaBlobUrlRef = useRef(null);
    const handleRecording = (media) => {
      console.log(media);
      setMedia(media);
    };
    return (
  <div>
    <ReactMediaRecorder
      video={false}
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <button onClick={() => {handleRecording(mediaBlobUrl)}}>Show Recording</button>
          {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
        </div>
      )}
    />
  </div>
);}

export default RecordView;