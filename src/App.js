import './App.css';
import Register from './register/Register';
import Signin from './sign/Signin';
import Chat from './chat/Chat';

import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {


  return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}></Route>    
          <Route path="/register" element={<Register/>}></Route>
          <Route path='/chats'element={<Chat/>}></Route>
        </Routes>
        </BrowserRouter>  
      </div>
    );
}

export default App;


