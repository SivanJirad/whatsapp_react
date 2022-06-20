import '../../chat.css'
import { React, useRef } from 'react';


async function sendContactToDB(contact, token) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token  },
        body: JSON.stringify(contact),
    };
    const response = await fetch('http://localhost:5271/api/contacts', requestOptions);
    const stat = await response.status;
    return stat;
}





function AddContact(props) {

    let name = useRef();
    let nickName = useRef();
    let server = useRef();

    async function deleteContact(contact){

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + props.token},
        };
        const url = 'http://localhost:5271/api/contacts/' + contact;
        const response = await fetch(url, requestOptions);
        // status 200 if succeed and 400 oterwise
        const stat = response.status;
        return stat;
    }

    async function inviteContact(inivitation, token, server) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token  },
            body: JSON.stringify(inivitation),
        };
        const response = await fetch('http://' + server + '/api/invitations',  requestOptions)
        .catch(error =>{
            const stat = deleteContact(name.current.value);
            alert("not a valid server")
            return false;
        }) 
        const stat = response.status;
        return stat;
    }


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
            alert("A problem occurred while getting contacts")
        }
    }


    async function addContact(event) {
        event.preventDefault();

        let stat = await sendContactToDB({id: name.current.value, name: nickName.current.value, server: server.current.value}, props.token);
        if(stat < 300){
            const statServer2 =  await inviteContact({from: props.userName , to: name.current.value, server: server.current.value}, props.token, server.current.value);
            
            if(statServer2 !== false && statServer2 >= 300){
                const stat = deleteContact(name.current.value);
                alert("A problem occurred while adding the contact")
            }
            else if(statServer2 !== false){
                await getContacts();
            }
        }
        else{
            alert("not a valid contact")
        }

         name.current.value = ''
         nickName.current.value = ''
         server.current.value = ''
    }
 
    return (

            <div>

            <i className="bi bi-person-plus" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Enter User Name</label>
                                    <input type="text" className="form-control" id="recipient-name" ref={name}></input>
                                    <label htmlFor="recipient-name" className="col-form-label">Enter Nick Name</label>
                                    <input type="text" className="form-control" id="recipient-name" ref={nickName}></input>
                                    <label htmlFor="recipient-name" className="col-form-label">Enter server</label>
                                    <input type="text" className="form-control" id="recipient-name" ref={server}></input>
                                    <button type="submit" id="btn" className=" btn btn_start btn-primary" data-bs-dismiss="modal" onClick={addContact} > Add</button>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>

        </div>


        
    );
}

export default AddContact

