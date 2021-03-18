import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useForm } from "react-hook-form";
import './Login.css'
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur"
  });
  const [newUser,setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user,setUser] = useState({
    name: '',
    email: '',
    password: '',
    message:false,
    error: ''
  })
//   console.log("user",user)
  const onSubmit = (data) => {
    setUser(data);
    if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            const newUserInfo = {...user};
            newUserInfo.message = true;
            newUserInfo.error = "";
            // ...
            setUser(newUserInfo)
            console.log(user);
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.message = false;
            newUserInfo.error = error.message;
            setUser(newUserInfo)
            // ..
        });
    }
    if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in
            const newUserInfo = {...user};
            newUserInfo.message = true;
            newUserInfo.error = '';
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            // ...
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.message = false;
            newUserInfo.error = error.message;
            setUser(newUserInfo);
        });
    }
  };

//   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container mt-5">
        <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
        <label htmlFor="newUser">Register</label>
      <form className="form-style d-flex justify-content-center" onBlur={handleSubmit(onSubmit)}>
        <div>
            {newUser && <input name="name" ref={register({ required: true })} placeholder="Your name"/>}
            {errors.name && <span className="error">This field is required</span>}

            <input name="email" ref={register({ required: true,pattern: /\S+@\S+\.\S+/ })} placeholder="Your email"/>
            {errors.email && <span className="error">This field is required</span>}
           
            <input type="password" name="password" ref={register({ required: true,pattern: /\d{1}/,minLength: 6})} placeholder="Your Password"/>
            {errors.password && <span className="error">This field is required</span>}
            <input onClick={handleSubmit(onSubmit)} type="submit" value={newUser ? 'Sign up':'Sign In'} />
        </div>
      </form>
      <div>
          <h4>Name: {user.name} </h4>
          <h6>Email: {user.email} </h6>
          {
            user.message && <p style={{color:'green'}}>User {newUser? 'created':'logged in' } successfully</p>
          }
          <p style={{color:'red'}}> {user.error} </p>
      </div>
    </div>
  );
};

export default Login;
