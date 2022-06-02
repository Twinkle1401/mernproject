import React from 'react';
import { useEffect,useState } from 'react';

const Contact = () => {

  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});

  const userContact = async () => {
      try{
        const res = await fetch('/getdata', {
           method:"GET",
           headers:{
             "Content-Type":"application/json"
           },
        });

        const data = await res.json();
        console.log(data);

       setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

        if(!res.status===200){
          const error = new Error(res.error);
          throw error;
        }

      }catch(err){
  console.log(err);
      }
  }

  useEffect(() => {
      userContact();
  }, []);

  //storing msg and all data in state
  const handleInputs =(e) =>{
    const name=e.target.name;
    const value=e.target.value;

    setUserData({...userData, [name]:value});
  }

  //send data to backend
  const contactForm = async (e) => {
    e.preventDefault();

    const {name, email, phone, message} = userData;
    
    const res = await fetch('/contact', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,email,phone,message})
    });

    const data = await res.json();

    if(!data){
      console.log("message not sent");
    } else{
      alert("Message sent !");
      setUserData({...userData, message:""});
    }
  }

  return (
   
    <>
    <div className="row justify-content-center">
<div className="col-lg-10">
<div className="wrapper">
<div className="row no-gutters">
<div className="col-md-6 d-flex align-items-stretch blocks">
<div className="contact-wrap w-100 p-md-5 p-4 py-5 shadow-sm p-3 mb-5 rounded">
<h3 className="mb-3">Write us</h3>
 {/* <div id="form-message-warning" className="mb-4"></div>
<div id="form-message-success" className="mb-4">
Your message was sent, thank you!
</div>  */}
<form method="POST" id="contactForm" name="contactForm" className="contactForm" novalidate="novalidate">
<div className="row">
<div className="col-md-12">
<div className="form-group mb-3">
<input type="text" className="form-control contact-input" name="name" id="name" value={userData.name} placeholder="Name" required="true"
   onChange={handleInputs} />
</div>
</div>
<div className="col-md-12">
<div className="form-group mb-3">
<input type="email" className="form-control contact-input" name="email" value={userData.email} placeholder="Email" required="true"
   onChange={handleInputs} />
</div>
</div>
<div className="col-md-12">
<div className="form-group mb-3">
<input type="number" className="form-control contact-input" name="phone" value={userData.phone} placeholder="Phone Number" required="true"
     onChange={handleInputs}
/>
</div>
</div>
<div className="col-md-12">
<div className="form-group mb-3">
<textarea name="message" className="form-control contact-input" id="message" cols="30" rows="6" placeholder="Message" required="true"
   onChange={handleInputs}
  value={userData.message} />
</div>
</div>
<div className="col-md-12">
<div className="form-group mb-3">
<input type="submit" value="Send Message" className="btn btn-dark" onClick={contactForm}/>
</div>
</div>
</div>
</form>
</div>
</div>
<div className="col-md-6 d-flex align-items-stretch">
<div className="info-wrap w-100 p-md-5 p-4 py-5 img shadow-sm p-3 mb-5 rounded">
<h3 className='clr'>Contact information</h3>
<p className=' mb-3 clr'>We're open for any suggestion or just to have a chat</p>
<div className="dbox w-100 d-flex align-items-center">
<div className="icon d-flex align-items-center justify-content-center">
<span className="fa fa-map-marker clr"></span>
</div>
<div className="text pl-3">
<p className='clr'><span>Address:</span> 323, Sindhi Colony, Indore</p>
</div>
</div>
<div className="dbox w-100 d-flex align-items-center">
<div className="icon d-flex align-items-center justify-content-center">
<span className="fa fa-phone clr"></span>
</div>
<div className="text pl-3">
<p className='clr'><span>Phone:</span> +91 7869738785</p>
</div>
</div>
<div className="dbox w-100 d-flex align-items-center">
<div className="icon d-flex align-items-center justify-content-center">
<span className="fa fa-paper-plane clr"></span>
</div>
<div className="text pl-3">
<p className='clr'><span>Email: </span> twinklemakhija100@gmail.com</p>
</div>
</div>
<div className="dbox w-100 d-flex align-items-center">
<div className="icon d-flex align-items-center justify-content-center">
<span className="fa fa-globe clr"></span>
</div>
<div className="text pl-3">
<p className='clr'><span>Website: </span> abc.com</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</>
/* <!--Section: Contact v.2--> */
  )

}

export default Contact;