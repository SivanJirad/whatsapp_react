import { useLocation } from "react-router-dom";
import ChatList from "./chatContacts/chatList/ChatList";
import {useState} from 'react';
import SendMessage from "./messageScreen/SendMessage";
import './chat.css'
import UserTextBox from './messageScreen/UserTextBox'
import welcome from './welcome.jpg' 
import NameContact from './messageScreen/NameContact'
import UserProfile from "./chatContacts/topLine/UserProfile";

function Chat() {


  const { state } = useLocation();
  const {  token, userName } = state;

  const [contactsList, setContactsList] = useState([])


  const [messages, setMessage] = useState([])
  const [userChatPrassed, setUserChatPrassed] = useState(null);

  return (
    <div className="container center-chats">
      <div className="row">

        <div className="col-4" id="leftMenu">

        <UserProfile userName={userName}  token={token} setContactsList={setContactsList}/>

          <div className="scroll">
            {<ChatList setUser={setUserChatPrassed} setMessages = {setMessage} token={token}  contactsList={contactsList} setContactsList={setContactsList}/>}
          </div>
        </div>  
        <div className="col-8" id="chats">
        {userChatPrassed === null && <img src={welcome} alt="welcome" className="welcome"></img>}
        
        {userChatPrassed !== null && <NameContact item={userChatPrassed}/>}
        <div className="message-scroll">
        { userChatPrassed !== null && <UserTextBox messages = {messages}/>}  
      </div>
      <div>   

        {userChatPrassed !== null && <SendMessage setMessage={setMessage} myUser={userName} chatUser={userChatPrassed} token={token} setContactsList={setContactsList}/>}
        </div>
        </div>
      </div>
     </div>
  );
}
export default Chat
