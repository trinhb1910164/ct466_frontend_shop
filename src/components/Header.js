import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const userCartState = useSelector((state) => state.auth.cartProducts);
  const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate("/")
  }
  const [total, settotal] = useState(null);
  useEffect(() => {
    let sum =0;
    for(let index = 0; index < userCartState?.length; index++){
      sum= sum + (Number(userCartState[index].quantity*userCartState[index].price))
      settotal(sum)}
  },[userCartState])
  if(getUserfromLocalStorage==null)
    return (
      <>
        <header className="header-upper py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className='col-3 '>
                <Link><img src="/images/logo.png" alt="logo"/></Link>        
              </div>
              <div className='col-5'>
                <div className="input-group">
                    <input type="text" className="form-control py-2" placeholder="Tìm kiếm sản phẩm tại đây..." aria-label="Tìm kiếm sản phẩm tại đây..." aria-describedby="basic-addon2"/>
                    <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs-6'/></span>
                </div>
              </div>
              <div className="col-4">
                <div className="row header-upper-links d-flex align-items-center justify-content-between">
                  <div className="col-6">
                            
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={user} alt="user" />
                      <p className="mb-0">
                        Log in <br /> My Account
                      </p>
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="/cart"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={cart} alt="cart" />
                      <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark">0</span>
                        <p className="mb-0">0 vnđ</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <header className="header-bottom py-3">
          <div className="container-xxl">
          <div className="row">
            <div className="col-12 row menu-links">
              <div className="col-4"></div>
              <NavLink className="col-2 menu" to="/">TRANG CHỦ</NavLink>
              <NavLink className="col-2 menu" to="/product">CỬA HÀNG</NavLink>
            </div>
          </div>
          </div>
        </header>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                  <div className="carousel-item active">
                  <img src="images/banner-dongho-3.jpg" className="d-block w-100" alt="...1"/>
                  </div>
                  <div className="carousel-item">
                  <img src="images/banner-desktop-10.jpg" className="d-block w-100" alt="...2"/>
                  </div>
                  <div className="carousel-item">
                  <img src="images/banner-4.png" className="d-block w-100" alt="...3"/>
                  </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
            </div>
      </>
    );
  else 
  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className='col-3 '>
              <Link><img src="/images/logo.png" alt="logo"/></Link>        
            </div>
            <div className='col-5'>
              <div className="input-group">
                  <input type="text" className="form-control py-2" placeholder="Tìm kiếm sản phẩm tại đây..." aria-label="Tìm kiếm sản phẩm tại đây..." aria-describedby="basic-addon2"/>
                  <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs-6'/></span>
              </div>
            </div>
            <div className="col-4">
              <div className="row header-upper-links d-flex align-items-center justify-content-between">
                <div className="col-6">
                          
                  <div role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false" 
                    className="d-flex align-items-center gap-10 text-white" 
                    >
                    <img src={user} alt="user" />
                    <p className="mb-0">
                    { `${getUserfromLocalStorage.firstname}`} <br /> { `${getUserfromLocalStorage.email}`}
                    </p>
                  </div>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/order"
                    >
                      Xem đơn hàng
                    </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item py-1 mb-1"
                        style={{ height: "auto", lineHeight: "20px" }}
                        to="/" onClick={logout}
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </div>
                </div>
                <div className="col-6">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{userCartState?.length ? userCartState?.length : 0}</span>
                      <p className="mb-0">{userCartState?.length ? total : 0} vnđ</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 row menu-links">
              <div className="col-4"></div>
              <NavLink className="col-2 menu" to="/">TRANG CHỦ</NavLink>
              <NavLink className="col-2 menu" to="/product">CỬA HÀNG</NavLink>
            </div>
          </div>
        </div>
      </header>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="images/banner-dongho-3.jpg" className="d-block w-100" alt="...1"/>
                </div>
                <div className="carousel-item">
                <img src="images/banner-desktop-10.jpg" className="d-block w-100" alt="...2"/>
                </div>
                <div className="carousel-item">
                <img src="images/banner-4.png" className="d-block w-100" alt="...3"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
          </div>
    </>
  );
};

export default Header;
