import '../chat.css'
import './message.css'


function NameContact(props) {
    return (
            <div className="top-row list-group-item d-flex align-items-center">
                <img src={props.item.image} alt="Avatar" className="avatar"></img>
                <span className="w-100 m-2 ms-3 nameContact chat-name" >{props.item.nickName}</span>
            </div>
    );

}


export default NameContact
