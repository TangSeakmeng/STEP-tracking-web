import React from 'react';

function Footer(props: any) {
  return (
    <>
      <div className="firstRow_FooterContainer">
        <div className="containerWrapper">

          <div className="flexCenterSpaceBetween">
            <p>Get connected with us on social media.</p>

            <div className="socialMediasContainer">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-google-plus-g"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>

        </div>
      </div>
      <div className="secondRow_FooterContainer">
        <div className="containerWrapper" style={{ padding: '40px 20px', boxSizing: 'border-box' }}>

          <div className="gridContainerWith4Blocks">
            <div className="blockContainer"style={{paddingRight: '20px'}}>
              <h4>FEDEX EXPRESS</h4>
              <div className="lineDecoration"></div>
              <div className="descriptionContainer">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>

            <div className="blockContainer">
              <h4>PRODUCTS</h4>
              <div className="lineDecoration"></div>
              <ul>
                <li>Delivery Service</li>
                <li>Tracking Service</li>
                <li>Customer Support</li>
                <li>Online Shopping</li>
              </ul>
            </div>

            <div className="blockContainer">
              <h4>USEFUL LINKS</h4>
              <div className="lineDecoration"></div>
              <ul>
                <li>Your Account</li>
                <li>Become an Affiliate</li>
                <li>Shipping Rates</li>
                <li>Help</li>
              </ul>
            </div>

            <div className="blockContainer">
              <h4>CONTACT</h4>
              <div className="lineDecoration"></div>
              <ul>
                <li>
                  <i className="fas fa-map-marked"></i>
                  <span>IT Academy STEP Cambodia, Phnom Penh</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>tangseakmeng01@gmail.com</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>012 345 678</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
      <div className="thirdRow_FooterContainer">
        <p>Copyright © 2021 Apple Inc. All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;