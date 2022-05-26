import React from 'react'

import "./Footer.css"

function Footer() {
  return (
    <footer id="footer">
       <div className="leftfooter">
         <h4>Download out APP</h4>
         <p>download app for both android and ios systems</p>
         <img src="https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/playstore.png" 
         alt="playstore"/>
         <img src="https://raw.githubusercontent.com/meabhisingh/mernProjectEcommerce/master/frontend/src/images/Appstore.png"
          alt="playstore"/>
         
         
       </div>
       <div className="middlefooter">
          <h1>ECOMMERCE.</h1>
          <p>High Quality is our first priority</p>

          <p>Copyrights 2022 &copy; Me Abhishek kumar for masai</p>
       </div>
       <div className="rightfooter">
       <h4 id="follow">Follow Us</h4>
          <a href="http://instagram.com/meabhisingh">Instagram</a>
          <a href="http://youtube.com/6packprogramemr">Youtube</a>
          <a href="http://instagram.com/meabhisingh">Facebook</a>
       </div>
        
    </footer>
  )
}

export default Footer