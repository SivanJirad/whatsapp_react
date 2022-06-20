
import { useRef } from "react";
import "./windowPop.css"

function AttachFile(props) {

    let fileInput = useRef();

    const uploadFile = (event) => {
        fileInput.current.click(event);
    }

    const send = (event) => {
       let value = URL.createObjectURL(event.target.files[0]);
        props.setNewMessage("file", value)

    };

    return (
        <div>
            <div className="mb-3">
            <input type="file" className="form-control form-control-imag  chooseImage" id="file" name="file" accept="application/pdf" onChange={send} ref={fileInput}></input>

            </div>
            <div><i className="bi bi-filetype-pdf file-color attchment-icon" onClick={uploadFile}></i></div>
        </div>

    );
}
export default AttachFile 