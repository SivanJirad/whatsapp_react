import AddContact from "./AddContact";
import avatar from '../chatList/avatar.png'


function UserProfile(props){


    return(

        <div className="top-row list-group-item d-flex align-items-center">
            <img src={avatar} alt="Avatar" className="avatar"></img>
            <span className="w-100 m-2 ms-3 nameContact chat-name" >{props.userName}</span>
            <AddContact setContact={props.setContact}  token={props.token} userName={props.userName} setContactsList={props.setContactsList}/>
            </div>
    );


}

export default UserProfile;

