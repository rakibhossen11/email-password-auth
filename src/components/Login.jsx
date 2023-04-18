import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        setError('');
        setSuccess('');

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            if(!loggedUser.emailVerified){

            }
            setSuccess('logged user successfully');
            setError('');
        })
        .catch(error =>{
            setError(error.message);
        })
    }

    const handleRestPassword = event =>{
      const email = emailRef.current.value;
      if(!email){
        alert('Please provide your email address to reset password');
        return;
      }
      sendPasswordResetEmail(auth,email)
      .then(() =>{
        alert('Please check your email');
      })
      .catch(() =>{
        console.log(error);
        setError(error.message);
      })
    }

  return (
    <div className="w-25 mx-auto">
        <h2>Please login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control mb-2"
            id="email" name="email" ref={emailRef}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mb-2"
            id="password" name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p><small>Forget password Please <button className="btn btn-link" onClick={handleRestPassword}>Reset password</button> </small></p>
        <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
        <p>{error}</p>
        <p>{success}</p>
      </form>
    </div>
  );
};

export default Login;
