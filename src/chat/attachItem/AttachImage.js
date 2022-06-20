
import { useRef } from "react";
import "./windowPop.css"


function AttachImage(props) {

    let imageInput = useRef();

    const uploadImage = (event) => {
        imageInput.current.click(event);
    }

    const send = (event) => {
       let value = URL.createObjectURL(event.target.files[0]);
        props.setNewMessage("image", value)

    };

    return (
        <div>
            <div className="mb-3">
            <input type="file" className="form-control form-control-imag  chooseImage" id="image" name="image" accept="image/png, image/jpeg" onChange={send} ref={imageInput}></input>

            </div>
            <div><i className="bi bi-image image-color attchment-icon" onClick={uploadImage}></i></div>
        </div>

    );
}
export default AttachImage 