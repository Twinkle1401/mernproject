import React, { useEffect, useState } from 'react'

const Home = () => {
   const [name, setName] = useState('');
   const [show, setShow] = useState(false);
   
   const userHome = async () => {
    try{
      const res = await fetch('/getdata', {
         method:"GET",
         headers:{
           "Content-Type":"application/json"
         },
      });

      const data = await res.json();
      
            setName(data.name);
            setShow(true);
    
   }
   catch(err){
     console.log(err);
   }
  }


   useEffect(() => {
     userHome();
   },[]);

  return (
    <>
    <div className='home-page'>
    <div className='home-content'>
    <div>Welcome</div>
    <h3>{name}</h3>
    <div className='home-text'>{show ?  "Good to see u back !" : "We are the MERN DEVELOPERS"}</div>
    </div>
    </div>
    </>
  )

}
export default Home;