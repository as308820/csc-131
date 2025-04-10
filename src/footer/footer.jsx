import React from "react";
import './footer.css';
import fb from '../images/fbimg.png'
import x from '../images/ximg.png'
import instagram from '../images/igimg.jpeg'
import linkedin from '../images/linkedinimg.png'
import csus from '../images/csus.png'



const Footer=()=>{
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                   
                   <a href="/For Business">
                        <p>For Business </p>
                    </a>
                    <a href="/Employer">
                        <p>Employer </p>
                    </a>
                    <a href="/healthplan">
                        <p>Health Plan </p>
                    </a>
                    <a href="/individual">
                        <p>Individual </p>
                    </a>

                </div>
               
                  
                <div className="sb__footer-links_div">
                    
                  

                </div>

               
                <div className="sb__footer-links_div">
  <h4>Find us on:</h4>

  <div className="socialmedia">
    <p>
      <a href="https://www.facebook.com/profile.php?id=61574022311459  " target="_blank" rel="noopener noreferrer">
        <img src={fb} alt="Facebook" />
      </a>
    </p>
    <p>
      <a href="https://x.com/ProjectAlpha131" target="_blank" rel="noopener noreferrer">
        <img src={x} alt="X (Twitter)" />
      </a>
    </p>
    <p>
      <a href="https://www.instagram.com/projectalpha131/" target="_blank" rel="noopener noreferrer">
        <img src={instagram} alt="Instagram" />
      </a>
    </p>
    <p>
      <a href="https://www.linkedin.com/in/project-alpha-7b9398357/" target="_blank" rel="noopener noreferrer">
        <img src={linkedin} alt="LinkedIn" />
      </a>
    </p>
    <p>
      <a href="https://www.csus.edu/" target="_blank" rel="noopener noreferrer">
        <img src={csus} alt="CSUS" />
      </a>
    </p>
  </div>
</div>
                    
                 
                 <hr></hr>


                <div className ="sb__footer-below"> 
                    <div className ="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear()} CSU. All right reserved.
                        </p>

                    </div>
                    <div className ="sb__footer-below-links"> 
                        <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                        <a href="/privacy"><div><p>Privacy</p></div></a>
                        <a href="/security"><div><p>Security</p></div></a>
                        <a href="/cookie"><div><p>Cookie Declaration</p></div></a>



                        </div>
                </div>
            </div>

        </div>

    )

}
export default Footer;