import React, {useState} from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
//import { auth } from '../firebase';
import { useStateValue } from '../../context/StateProvider';


function Register() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useStateValue();


    const register = (event)=>{
        event.preventDefault();
        let requestBody = {
            query: `
                mutation{
                    addUser(name: "${name}", email: "${email}", password: "${password}"){
                        _id
                        email
                        name
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
                alert(`Thank You ${respData.data.addUser.name}. You have registered successfully`)
                history.push('/login');
            }
        })
        .catch(err=>{
            console.log("Error register..>>>>>>>>>>>>>", err)
           alert("Register is failing", err)
        })
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
            <h1>Register</h1>
            <form>

                <h5>Name</h5>
                <input type="email" onChange={(event)=> setName(event.target.value)}/>

                <h5>Email</h5>
                <input type="email" onChange={(event)=> setEmail(event.target.value)}/>

                <h5>Password</h5>
                <input type="password" onChange={(event)=> setPassword(event.target.value)} />
                {/* <button type= "submit" onClick={firebaseLogin} className="login__signInButton">Sign In</button> */}
                <button type= "submit" onClick={register} className="login__signInButton">Register</button>
                <p>
                    Already have an account ?
                </p>
                <button type= "submit" className="login__registerButton">Go to login</button>
            </form>
        </div>
    </div>
    )
}

export default Register;
