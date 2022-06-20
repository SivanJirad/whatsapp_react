import ChatItem from "./ChatItem";
import { useEffect } from "react";

function ChatList(props){

useEffect(() => {
    async function getContacts() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + props.token},
        };
        const response = await fetch('http://localhost:5271/api/contacts', requestOptions);
        if(response.status < 300){
            const list = await response.json();
            props.setContactsList(list);
        }
        else{
            alert("A problem occurred while getting messages")
        }

    }
    getContacts();
  }, []);



    return(
        <>
        <div className="list-group list-group-flush">
            { 
            props.contactsList.map((item)=>
            <ChatItem key={item.id} contact={item} setUser={props.setUser} setMessages = {props.setMessages} token={props.token}/>
            )}
        </div> 
        </>
        );
}
export default ChatList
