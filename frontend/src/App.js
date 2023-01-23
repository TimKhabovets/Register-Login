import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import UserStore from './stores/UserStore';
import UserList from './components/UserList';
import './App.css';

class App extends React.Component {

  async componentDidMount() {

    // UserStore.loading = false;
    // UserStore.isLoggedIn = false;
    // try {

    //   let res = await fetch('/isLoggedIn', {
    //     method: 'post',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   let result = await res.json();

    //   if (result & result.success) {
    //     UserStore.loading = false;
    //     UserStore.isLoggedIn = true;
    //     UserStore.username = result.username;
    //   }
    //   else {
    //     UserStore.loading = false;
    //     UserStore.isLoggedIn = false;
    //   }
    // }

    // catch (error) {
    //   UserStore.loading = false;
    //   UserStore.isLoggedIn = false;
    // }
  }

  // async doLogout() {
  //   try {

  //     let res = await fetch('/isLoggedIn', {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     let result = await res.json();

  //     if (result & result.success) {
  //       UserStore.isLoggedIn = false;
  //       UserStore.username = '';
  //     }
  //   }

  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {

    return (
      <div className='app'>
        <div className='container'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userlist" element={<UserList />} />
            </Routes>
          </BrowserRouter>
        </div></div>
    );
  }
}

export default App;
