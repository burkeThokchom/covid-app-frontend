import React, {useState} from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useStateValue();

    const login = (event)=>{
        event.preventDefault();
        let requestBody = {
            query: `
                mutation{
                    login(email: "${email}", password: "${password}"){
                        token
                        userId
                        email
                        tokenExpiryTime
                        user{
                            _id
                            name
                            email
                        }
                    }
                }
                
            `
        };
        
        fetch('http://localhost:3003/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status!==200 && res.status !==201){
                console.log("Bad request ",res);
                throw new Error('Failed Here');
            }
            return res.json();
        })
        .then(respData=>{
            if(respData.data){
                localStorage.setItem('token',  respData.data.login.token);
                localStorage.setItem('userId', respData.data.login.user ? respData.data.login.user._id : '');
                localStorage.setItem('email', respData.data.login.user ? respData.data.login.user.email : '');
                
                dispatch({
                    type: "LOGIN_SUCCESS",
                    user: respData.data.login.user,
                    token: respData.data.login.token,

                })
                console.log(localStorage)
                history.push('/dashboard');
            }
        })
        .catch(err=>{
            console.log("Error login..>>>>>>>>>>>>>", err)
           alert("login is failing", err)
        })
    }

    const goToLogin = ()=>{
        history.push('/register')
    }
    return (
        <div className="login">
            <Link to ='/'>
                <img
                    className="login__logo" 
                    src= "https://thecollegepost.com/wp-content/uploads/2019/07/Amazon-logo.png"
                    alt=""
                />  
            </Link>
            <div className = "login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>Email</h5>
                    <input type="email" onChange={(event)=> setEmail(event.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" onChange={(event)=> setPassword(event.target.value)} />
                    {/* <button type= "submit" onClick={firebaseLogin} className="login__signInButton">Sign In</button> */}
                    <button type= "submit" onClick={login} className="login__signInButton">My Sign In</button>
                    <p>
                        Create an account if you dont have any.
                    </p>
                    <button type= "submit" className="login__registerButton" onClick={goToLogin}>Register with us</button>
                </form>
            </div>
        </div>
    )
}

export default Login