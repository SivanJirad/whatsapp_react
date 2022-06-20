import '../../chat.css'
import { useState, useEffect } from 'react';
import avatar from './avatar.png' 

function ChatItem(props) {

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
          setDate(new Date());
        }, 30000);
      });


    async function goToMethod(){
        const contact = await showContact();
        if(contact === false){
            alert("A problem occurred while getting the contact")
        }
        else{
            await props.setUser({userName: contact.id ,nickName:contact.name, image: avatar});
        }
        const messages = await getAllContactMessages();

        if(messages === false){
            alert("A problem occurred while getting the messages")
        }
        else{
            props.setMessages(messages);
        }
    }


    async function getAllContactMessages(){

        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + props.token },
          };
          var url = 'http://localhost:5271/api/contacts/' + props.contact.id + '/' + 'messages'
          const response = await fetch(url, requestOptions);
          if(response.status < 300){
            const messageList = await response.json();
            return messageList;
          }
          return false;
    }


    async function showContact(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + props.token},
        };
        const url = 'http://localhost:5271/api/contacts/' + props.contact.id;
        const response = await fetch(url, requestOptions);
        if(response.status < 300){
            const stat = await response.json();
            return stat;
        }
        return false;
    }



    async function deleteContact(){

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + props.token},
        };
        const url = 'http://localhost:5271/api/contacts/' + props.contact.id;
        const response = await fetch(url, requestOptions);

        // status 200 if succeed and 400 oterwise
        const stat = response.status;
    }


    async function editContact(editdetails){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token},
            body: JSON.stringify(editdetails),
        };
        const url = 'http://localhost:5271/api/contacts/' + props.contact.UserName;
        const response = await fetch(url, requestOptions);

        // status 200 if succeed and 400 oterwise
        const stat = response.status;
    }


    const SECOND = 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24,
    MONTH = DAY * 30,
    YEAR = DAY * 365;
    

    function setTime(responseDate){
        let dateComponents = responseDate.split(' ');
        let datePieces = dateComponents[0].split("/");
        let timePieces = dateComponents[1].split(":");
        let dateLastMessage = new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                             timePieces[0], timePieces[1], timePieces[2]);
        return dateLastMessage;
    }



const getTimeAgoString = () => {
    var responseDate = new Date(props.contact.lastdate)
    if(isNaN(responseDate)){
        responseDate =setTime(props.contact.lastdate)
    }
    const differance = date- responseDate;
    const getTimeString = (value, unit) => {
        const round = Math.round(differance / value);
        return `${round} ${unit}${round > 1
            ? 's'
            : ''} ago`;
        };
    if (differance < MINUTE) {
        return 'now';
    }
    if (differance < HOUR) {
        return getTimeString(MINUTE, 'minute');
    }
    if (differance < DAY) {
        return getTimeString(HOUR, 'hour');
    }
    if (differance < MONTH) {
        return getTimeString(DAY, 'day');
    }
    if (differance < YEAR) {
        return getTimeString(MONTH, 'month');
    }
    return getTimeString(YEAR, 'year');
};

    return (
        
            <button type="button" className="list-group-item list-group-item-action d-flex align-items-center" onClick={goToMethod}>
            <img src={avatar} alt="Avatar" className="avatar"></img>
            
            <span className="m-2 ms-3 nameContact" >
                <div className='chat-name'>{props.contact.name}</div>
                <div className='last-message'>
                {props.contact.last != null && <div>{props.contact.last}</div>}
                </div>
            
            </span> 
            
            <span className='time-ago'> {props.contact.lastdate != null  && getTimeAgoString()}   </span>


            </button>

    );
}

export default ChatItem
