import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateCurrentUser, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const handleEmailChange = (event) =>{
        // console.log(event.target.value);
        // setEmail(email.target.value);
    }
    const handlePasswordBlur = (event) =>{
        // console.log(event.target.value);
    }
    const handleSubmit = (event) =>{
        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. collect from data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name,email,password);
        // validation
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add at least one uppercase');
            return;
        }
        else if(password.length < 6){
            setError('Please add atleast 6 character in your password');
            return;
        }
        // 3. create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('user has been created successfully');
            sendVerificationEmail(result.user);
            upDateUserData(result.user,name);
        })
        .catch(error=>{
            console.log(error);
            setError(error.message);
            setSuccess('');
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result);
            alert('please verify your email');
        })
        .catch()
    }

    const upDateUserData = (user,name) =>{
        updateProfile(user,{
            displayName: name
        })
        .then(() =>{
            console.log('user name updated');
        })
        .catch(error =>{
            setError(error.message);
        })
    }


    return (
        <div className='w-50 mx-auto'>
            <h4>Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded px-2 ' type="text" name='name' id='name' placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4 rounded px-2 '  onChange={handleEmailChange} type="email" name='email' id='email' placeholder='your email address' required />
                <br />
                <input className='w-50 mb-4 rounded px-2 ' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p>Already have an account? Please <Link to="/login">Login</Link> </p>
            <p className='text-danger'>{error}</p>
            <p className='text-primary'>{success}</p>
        </div>
    );
};

export default Register;