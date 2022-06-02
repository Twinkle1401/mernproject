import React,{useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
    const {state, dispatch} = useContext(UserContext);

  const navigate=useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch("/signin", {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email,password})
        });

        const data= res.json();
        if(res.status===400 || !data){           //res.status not data.status
          window.alert("Invalid Credentials");
        }else{
          dispatch({type:"USER", payload:true});
          window.alert("Login Successfull");
          navigate("/");
        }
        
   }

  return (
    <div className='container'>
    <form method="POST">
    <div className='Loginform shadow p-3 mb-5 bg-white rounded'>
    <div className='w-50 mx-auto heading'>Sign In</div>
  
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='email'>Email address</label>
    <input type="email" className="form-control" name='email' id ='email' autoComplete='off'
      value={email} onChange={(e)=> setEmail(e.target.value)}
    />
  </div>
  
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='password'>Password</label>
    <input type="password" className="form-control" name='password' id ='password' autoComplete='off'
    value={password} onChange={(e)=> setPassword(e.target.value)} />
  </div>
  
  
  <div className='btnClass'>
  <button type="submit" className="btn btn-dark" name='signin' id='signin'
    onClick={loginUser}>Login</button>
  </div>

  <div className='mx-auto inputArea'>
    <NavLink to="/signup" className='linkToNewPage'>Create an account</NavLink>
  </div>

  </div>
</form>
</div>
  )
}

export default Login;