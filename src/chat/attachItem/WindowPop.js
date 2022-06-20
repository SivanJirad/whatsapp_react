import { Popover, OverlayTrigger} from 'react-bootstrap';
import "./windowPop.css"
import AttachImage from './AttachImage'
import AttachVideo from './AttachVideo';
import AttachAudio from './AttachAudio';
import AttachFile from './AttachFile';
function WindowPop(props){

    const popoverTop = (
      <Popover id="popover-positioned-top" title="Popover top">
        <AttachFile setNewMessage={props.setNewMessage}/>
        <AttachImage setNewMessage={props.setNewMessage}/>
       <AttachVideo setNewMessage={props.setNewMessage}/>
       <AttachAudio setNewMessage={props.setNewMessage}/>
      </Popover>
    );


return(
<div>

<OverlayTrigger trigger="click" placement="top" overlay={popoverTop} rootClose>
      <i className="bi bi-paperclip icon-send" ></i>
    </OverlayTrigger>
      </div>

        );
}
export default WindowPop