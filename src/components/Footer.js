import React from 'react'
import { NavLink } from 'react-router-dom';
import { AiFillTwitterSquare,AiFillGoogleSquare,AiFillInstagram} from 'react-icons/ai';
import {BsFacebook, BsLinkedin} from 'react-icons/bs';
const Footer = () => {
  return (
    <>
      <footer className=" footer container-fluid">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
          </div>
          <div className='footer-icon row'>
            <div className='col-2'><BsFacebook/></div>
            <div className='col-2'><AiFillTwitterSquare/></div> 
            <div className='col-2'><AiFillGoogleSquare/></div> 
            <div className='col-2'><AiFillInstagram/></div> 
            <div className='col-2'><BsLinkedin/></div>
          </div>
        </section>
        <section className="">
          <div className="container-fluid text-center text-md-start mt-5">
            <div className="row mt-1">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>Việt Trinh
                </h6>
                <p>
                  shop của chúng tôi chuyên bán các loại đồng hồ thương hiệu nổi tiếng cảm kết chất lượng. Bạn hãy yên tâm khi mua sắm tại shop của chúng tôi!
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  MENU
                </h6>
                <p>
                  <NavLink to="/" className="text-reset text-decoration-none">Trang chủ</NavLink>
                </p>
                <p>
                  <NavLink to="/product" className="text-reset text-decoration-none">Sản phẩm</NavLink>
                </p>
                <p>
                  <NavLink to="/cart" className="text-reset text-decoration-none">Giỏ hàng</NavLink>
                </p>
                
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                
                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                <div className='text-white'><img src="images/home.png" className='footer-img' alt="address"/> <span>9/7 Mậu Thân, Xuân Khánh, Ninh Kiều, Cần Thơ</span></div>
                <div className='text-white mt-1'>
                  <img src="images/mail.png" alt="email" className='footer-img'/>
                  trinhb1910164@example.com
                </div>
                <div className='text-white mt-1'><img src="images/phone.png" alt="phonenumber"className='footer-img'/> 0379756368</div>
              </div>
              
            </div>
            
          </div>
        </section>
  
        <div className="text-center p-4">
          © 2022 Copyright: khaviettrinhb1910164
        </div>
      </footer>
    </>
  );
};

export default Footer;