import React,{useState} from 'react'
import { NavLink , useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate= useNavigate();

   const [user,setUser] = useState({
     name:"",email:"",phone:"",work:"",password:"",cpassword:""
   });

   let name,value;
  const handleInputs = (e) => {
     name=e.target.name;
     value=e.target.value;
     setUser({...user, [name]:value});
  }

 const PostData = async(e) =>{
       e.preventDefault();

       const {name,email,phone,work,password,cpassword} = user;

      const res =  await fetch("/register", {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name,email,phone,work,password,cpassword
        })
      });

       const data=await res.json();
       if(res.status===422 || !data){
         window.alert("Invalid Registration");
         console.log("Invalid Registration");
       }else {
        window.alert("Registration Successfull");
        console.log("Registration Successfull");

        navigate("/login");
       }
 }

  return (
    <div className='container'>
    <form method="POST">
    <div className='Signupform shadow p-3 mb-5 bg-white rounded'>
    <div className='w-50 mx-auto heading'>Sign up</div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='name'>Name</label>
    <input type="text" className="form-control" name='name' id ='name' autoComplete='off'
      value={user.name}
      onChange={handleInputs}
    />
  </div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='email'>Email address</label>
    <input type="email" className="form-control" name='email' id ='email' autoComplete='off'
      value={user.email}
      onChange={handleInputs}
    />
  </div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='phone'>Phone Number</label>
    <input type="number" className="form-control" name='phone' id ='phone' autoComplete='off'
      value={user.phone}
      onChange={handleInputs}
    />
  </div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='work'>Profession</label>
    <input type="text" className="form-control" name='work' id ='work' autoComplete='off'
      value={user.work}
      onChange={handleInputs}
    />
  </div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='password'>Password</label>
    <input type="password" className="form-control" name='password' id ='password' autoComplete='off'
    value={user.password}
    onChange={handleInputs} />
  </div>
  <div className="mb-3 mx-auto inputArea">
    <label className="form-label" htmlFor='cpassword'>Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id ='cpassword' autoComplete='off'
    value={user.cpassword}
    onChange={handleInputs} />
  </div>
  
  <div className='btnClass'>
  <button type="submit" className="btn btn-dark" name='signup' id='signup' value="register"
  onClick={PostData}>Register</button>
  </div>

  <div className='mx-auto inputArea'>
    <NavLink to="/login" className='linkToNewPage'>Already Registered ?</NavLink>
  </div>

  </div>
</form>
</div>
  )
}

export default Signup;