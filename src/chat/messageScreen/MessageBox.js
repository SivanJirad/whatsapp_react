import './message.css'


function MessageBox(props) {

    let className = "alert message ".concat(props.item.sent ? 'alert-success send' : 'alert-warning recieve');
            

    return (
        <>
         <div className={className} >
            <div>{props.item.content}</div>
            <div className='chat-log_time'>{new Date(props.item.created).toDateString()}</div>
        </div>
        </>
    );

}

export default MessageBox;  