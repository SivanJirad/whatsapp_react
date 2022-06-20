import { useRef, useEffect, useState, useReducer } from 'react';
import '../chat.css'
import { HubConnectionBuilder } from '@microsoft/signalr';

function SendMessage(props) {

  const Api = async function () {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + props.token },
    };
    var url = 'http://localhost:5271/api/contacts/' + props.chatUser.userName + '/' + 'messages'
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
  
  var url = 'http://localhost:5271/api/contacts/Ofri/' + 'messages/71'
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => console.log(data));
  
  const requestOptions3 = {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + props.token },
  };
  var url = 'http://localhost:5271/api/contacts/' + props.chatUser.userName + '/' + 'messages/61'
  fetch(url, requestOptions3)
  .then(response => response.json())
  .then(data => console.log(data));
  
  
  const requestOptions4 = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token  },
    body: JSON.stringify({Content: "hiiii is good"}),
  };
  var url = 'http://localhost:5271/api/contacts/' + props.chatUser.userName + '/' + 'messages/104'
  fetch(url, requestOptions4)
  .then(response => response.json())
  .then(data => console.log(data));
  }


  const [ connection, setConnection ] = useState(null);

  useEffect(() => {
      const newConnection = new HubConnectionBuilder()
          .withUrl('http://localhost:5271/hubs/chat')
          .withAutomaticReconnect()
          .build();

      setConnection(newConnection);
  }, [props.chatUser]);

  useEffect(() => {
      if (connection) {
          connection.start()
              .then(result => {
                  // console.log('Connected!');
                  connection.invoke("registerConId", props.myUser)
                  connection.on('ReceiveMessage', message => {
                    if(message.from ===props.chatUser.userName){
                      set(message.from)
                    }
                    else {
                      setContacts();
                    }
                  });
              })
              .catch(e => console.log('Connection failed: ', e));
      }
  }, [connection]);

  const sendMessageSignalIR = async (transfer) => {
      connection.invoke("SendMessage", transfer)
  }

  async function set(contact){
    const messages = await getAllContactMessages(contact);
    if (messages === false){
      alert("A problem occurred while getting messages")
    } else {
      props.setMessage(messages)
    }
    await setContacts();
  }

  let input = useRef()

  const uploadText = (event) => {
    let mes = input.current.value
    input.current.value = ''
    if (mes!==""){
      setNewMessage("text", mes)}
  }


async function sendMessageToDB(message,token,contactName) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token  },
        body: JSON.stringify(message),
    };
    var url = 'http://localhost:5271/api/contacts/' + contactName + '/' + 'messages'
    const response = await fetch(url, requestOptions);
    return response.status;
}

async function getServerContact(contact) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + props.token },
  };
  var url = 'http://localhost:5271/api/contacts/' + contact
  const response = await fetch(url, requestOptions);
  if(response.status < 300){
    const stat = await response.json();
    return stat;
  }
  return false;
}



async function sendMessageToDBofContact(message) {
  var serverContact = await getServerContact(message.to)
  if ( serverContact === false){
    alert("A problem occurred")
    return false;
  }
  const requestOptions1 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + props.token},
    body: JSON.stringify(message),
  };
  var url = 'http://' + serverContact.server + '/api/transfer'
  const response1 = await fetch(url, requestOptions1);
  return response1.status;
}

async function getAllContactMessages(contact){
  const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + props.token },
    };
    var url = 'http://localhost:5271/api/contacts/' + contact + '/' + 'messages'
    const response = await fetch(url, requestOptions);
    if(response.status < 300){
      const messageList = await response.json();
      return messageList;
    }
    return false;
}

async function setContacts() {
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
    alert("A problem occurred while getting the contacts")
  }

}
  
  const setNewMessage = async function (type, mes) {
      const stat = await sendMessageToDB({content: mes}, props.token,props.chatUser.userName);
      if(stat < 300){
        var transfer = {from: props.myUser ,to:props.chatUser.userName ,content: mes}
        const stat2 = await sendMessageToDBofContact(transfer)
        sendMessageSignalIR(transfer)
        set(props.chatUser.userName)
      }
      else {
        alert("Can't send message!")
      }
  }

const checkIfEnter = function (event) {
    if (event.key === 'Enter')
    uploadText("text")
}


  return (
    <div className="down-row d-flex align-items-center">
      <input type="text" id='TypingMessage' className="form-control shadow-none" placeholder="Typing a message" aria-label="Typing a message"
        ref={input} onKeyDown={checkIfEnter}></input>
      <i className="bi bi-send icon-send" onClick={uploadText}  ></i>
    </div>
  );
}

export default SendMessage
