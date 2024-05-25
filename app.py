import wave
import pyaudio
from faster_whisper import WhisperModel
import os
import time

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

def record_chunk(p, stream, file_path, chunk_length=1):
    frames = []
    for _ in range(0, int(16000 / 1024 * chunk_length)):
        data = stream.read(1024)
        frames.append(data)
    
    wf = wave.open(file_path, 'wb')
    wf.setnchannels(1)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(16000)
    wf.writeframes(b''.join(frames))
    wf.close()

def transcribe_chunk(model, file_path):
    segments, info = model.transcribe(file_path, bean_size=7)
    transcription = " ".join([seg["text"] for seg in segments])

def main2():
    model_size = "medium.en"
    model = WhisperModel(model_size, device="cuda", compute_type="float16")
    p = pyaudio.PyAudio()

    print("----------------------record device list---------------------")
    info = p.get_host_api_info_by_index(0)
    numdevices = info.get('deviceCount')
    for i in range(0, numdevices):
            if (p.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels')) > 0:
                print("Input Device id ", i, " - ", p.get_device_info_by_host_api_device_index(0, i).get('name'))

    print("-------------------------------------------------------------")
    index = int(input())

    stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, input_device_index=index, frames_per_buffer=1024)

    accumulated_transcription = ""

    try:
        while True:
            chunk_file = "temp_chunk.wav"
            record_chunk(p, stream, chunk_file)
            transcription = transcribe_chunk(model, chunk_file)
            print(transcription)
            os.remove(chunk_file)
    
    except KeyboardInterrupt:
        print("Stopping")
    
    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()

if __name__ == "__main__":
    main2()