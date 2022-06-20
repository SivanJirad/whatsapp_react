import '../chat.css'
import './message.css'
import MessageBox from "./MessageBox.js"


function UserTextBox(props) {
    let messageNum = 0
    return (
     
            <div className="textBox">
                {props.messages.map((item) => <MessageBox key={messageNum++} item={item} />)}
            </div>

    );

}


export default UserTextBox
