import { useState, useRef, useEffect } from "react";
import "./windowPop.css"


function AttachAudio(props){


      const [stream, setStream] = useState({
        recorder: null,
      });
    
      const [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
      });

      const [stopMic, setStopMic] = useState(false)


    
      const chunks = useRef([]);

    
    function getAccess(){
        setStopMic(true)
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((mic) => {
            let mediaRecorder = new MediaRecorder(mic, {mimeType: "audio/webm"})
 
            mediaRecorder.onstart = function () {
              setRecording({
                active: true,
                available: false,
                url: ""
              });
            };
    
            mediaRecorder.ondataavailable = function (e) {
              chunks.current.push(e.data);
            };
    
            mediaRecorder.onstop = async function () {    
              const url = URL.createObjectURL(chunks.current[0]);
              chunks.current = [];
    
              setRecording({
                active: false,
                available: true,
                url:url
              });
              
              setStream({
                recorder: null
            })

            };
    
            setStream({
              recorder: mediaRecorder
            });
          })
      }
      
      useEffect(() => {
        if(recording.available === true){
          const urlRecording = recording.url
          props.setNewMessage("audio", urlRecording)
          setRecording({
            active: false,
            available: false,
            url:null
          });
          setStopMic(false)
        }
      }, [recording.available]);


      
        return (
          <div className="margin-from-mic">

            <i onClick={getAccess} className="bi bi-mic mic-color attchment-icon" data-bs-toggle="tooltip" data-bs-placement="right"
                                            title="click me to record and than click again to send"></i>
            {stream.recorder!== null && !recording.active && stream.recorder.start()}
            {stopMic && <i onClick={() => stream.recorder.stop()} className="bi bi-mic attchment-icon" id="mic" data-bs-toggle="tooltip" data-bs-placement="right"
                                            title="click again to send"></i>}
          </div>

        
        );
}
export default AttachAudio