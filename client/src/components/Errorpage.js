import React from 'react';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
  return (
    <>
        <div id="notfound">
            <div className='notfound'>
                <div className='notfound-404'>
                    <h1>404</h1>
                </div>

                <h2>Sorry, Page not found !</h2>
                <p className='m-3 para'>
                    The page you are looking for might have been removed, had 
                    its name changed or is temporarily unavailable.
                </p>
                <NavLink className="link" to="/">Back to HomePage</NavLink>
            </div>
        </div>
        

    </>
  )
}

export default Errorpage;