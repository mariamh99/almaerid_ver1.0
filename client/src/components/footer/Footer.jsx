import React from "react";
import "./Footer.scss";
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate=useNavigate();
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Graphic Design");
            }}>Graphic and design            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Video and animation");
            }}>Video and animation
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Drawing and illustration");
            }}>Drawing and illustration
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Digital painting");
            }}>Digital painting
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Photography");
            }}>Photography</span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Print design");
            }}>Print design
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Typography design");
            }}>Typography design
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=Motion graphics");
            }}>Motion graphics
            </span>
            <span style={{cursor:"pointer"}} onClick={()=>{
              navigate("/listings?cat=3D Modeling and rendering");
            }}>3D modeling and rendering</span>


          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Al Maerid</span>
            <span>Buying on Al Maerid</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From             <span style={{fontFamily:"Josefin Sans"}}>Al Maerid</span>
</h2>
            <span>Al Maerid Business</span>
            <span>Al Maerid Pro</span>
            <span>Al Maerid Logo Maker</span>
            <span>Al Maerid Guides</span>
            <span>Get Inspired</span>
            <span>Al Maerid Select</span>
            <span>ClearVoice</span>
            <span>Al Maerid Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2 style={{fontFamily:"Josefin Sans"}}>Al Maerid</h2>
            <span>© Al Maerid International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;