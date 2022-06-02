import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate=  useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
      try{
        const res = await fetch('/about', {
           method:"GET",
           headers:{
             Accept:"application/json",
             "Content-Type":"application/json"
           },
           credentials:"include"
        });

        const data = await res.json();
        console.log(data);

       setUserData(data);

        if(!res.status===200){
          const error = new Error(res.error);
          throw error;
        }

      }catch(err){
  console.log(err);
  navigate("/login");
      }
  }

  useEffect(() => {
      callAboutPage();
  }, []);

  return (
    <>
      <div className='container emp-profile shadow'>
        <form method="GET">
          
                <ul className='nav nav-tabs' role="tablist">
                  <li className='nav-item'>
                    <a className='nav-link active' id='home-tab' data-bs-toggle="tab" href="#home" role="tab" aria-controls='home' aria-selected="true">About</a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' id='profile-tab' data-bs-toggle="tab" href="#profile" role="tab" aria-controls='profile' aria-selected="false">Timeline</a>
                  </li>
                </ul>
              
          
            <div className='col-md-8 pl-5 about-info'>
              <div className='tab-content profile-tab' id="myTabContent">
                 <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby='home-tab'>
                   <div className='row profile-details'>
                      <div className='col-md-6'>
                         <label>User ID</label>
                      </div>
                      <div className='col-md-6'>
                         <label>{userData._id}</label>
                      </div>
                   </div>

                   <div className='row'>
                      <div className='col-md-6'>
                         <label>Name</label>
                      </div>
                      <div className='col-md-6'>
                         <label>{userData.name}</label>
                      </div>
                   </div>

                   <div className='row'>
                      <div className='col-md-6'>
                         <label>Email</label>
                      </div>
                      <div className='col-md-6'>
                         <label>{userData.email}</label>
                      </div>
                   </div>

                   <div className='row'>
                      <div className='col-md-6'>
                         <label>Phone</label>
                      </div>
                      <div className='col-md-6'>
                         <label>{userData.phone}</label>
                      </div>
                   </div>

                   <div className='row'>
                      <div className='col-md-6'>
                         <label>Profession</label>
                      </div>
                      <div className='col-md-6'>
                         <label>{userData.work}</label>
                      </div>
                   </div>

                  
                 </div>
             
             <div className='tab-pane fade' id="profile" role="tabpanel" aria-labelledby='profile-tab'>
               <div className='row'>
                 <div className='col-md-6'>
                   <label>Experience</label>
                 </div>
                 <div className='col-md-6'>
                   <label>Expert</label>
                 </div>
               </div>

               <div className='row'>
                 <div className='col-md-6'>
                   <label>Hourly Rate</label>
                 </div>
                 <div className='col-md-6'>
                   <label>10$/hr</label>
                 </div>
               </div>

               <div className='row'>
                 <div className='col-md-6'>
                   <label>Total Projects</label>
                 </div>
                 <div className='col-md-6'>
                   <label>230</label>
                 </div>
               </div>

               <div className='row'>
                 <div className='col-md-6'>
                   <label>English Level</label>
                 </div>
                 <div className='col-md-6'>
                   <label>Expert</label>
                 </div>
               </div>

               <div className='row'>
                 <div className='col-md-6'>
                   <label>Availabilty</label>
                 </div>
                 <div className='col-md-6'>
                   <label>6 months</label>
                 </div>
               </div>

             </div>

              </div>
            </div>



          

        </form>
        </div>
    </>
  )
}

export default About;