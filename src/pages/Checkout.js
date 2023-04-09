import React,{useEffect, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addOrder, removeUserCart, updateUser } from "../features/user/userSlice";
import { toast } from "react-toastify";


const userSchema = yup.object({
  firstname: yup.string().required("Bắt buộc nhập."),
  lastname: yup.string().required("Bắt buộc nhập."),
  mobile:yup.string().required("Bắt buộc nhập."),
  address:yup.string().required("Bắt buộc nhập."),
});
const Checkout = () => {
  const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  const [total, settotal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile:"",
      address:"",
    },
    validationSchema:userSchema,
    onSubmit: (values) => {
      dispatch(updateUser({firstname:values?.firstname, lastname:values?.lastname, address:values?.address, mobile:values?.mobile}))
      dispatch(addOrder({orderItems:items, totalPrice: total}))
      for (let index = 0; index < userCartState?.length; index++) {
        dispatch(removeUserCart(userCartState[index]?._id))
      }
      navigate("/")
    },
  });
  
  const userCartState = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    let sum =0;
    for(let index = 0; index < userCartState?.length; index++){
      sum= sum + (Number(userCartState[index].quantity*userCartState[index].price))
      settotal(sum)
    }
    
  },[userCartState]);
  const items = [];
    for(let index = 0; index < userCartState?.length; index++){
      items.push({
        productId:userCartState[index]?.productId?._id, quantity:userCartState[index].quantity, price:userCartState[index].price
      })
    }
  console.log(userCartState);
  if(getUserfromLocalStorage!==null){
    return (
      <>
        <Container class1="checkout-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h4 className="title total" style={{fontWeight:"600"}}>THÔNG TIN LIÊN HỆ</h4>
                <p className="user-details total">
                { `${getUserfromLocalStorage.firstname}`} ( { `${getUserfromLocalStorage.email}`} )
                </p>
                <h5 className="mb-3 check-out-title">Cập Nhật Thông Tin Khách Hàng</h5>
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstname"
                      value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error">{formik.touched.firstname && formik.errors.firstname}</div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastname"
                      value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error">{formik.touched.lastname && formik.errors.lastname}</div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      className="form-control"
                      name="address"
                      value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")}
                    />
                    <div className="error">{formik.touched.address && formik.errors.address}</div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="form-control"
                      name="mobile"
                      value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">{formik.touched.mobile && formik.errors.mobile}</div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center"style={{marginLeft:"500px"}}>
                      <button className="button" type="submit">
                        Continue to Shipping
                      </button>
                    </div>
                  </div>
                </form>
                <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                </Link>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
              {
                userCartState && userCartState?.map((item,index) =>{
                  return(
                    <div className="d-flex gap-10 mb-2 align-align-items-center" key={index}>
                    <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      >
                        {item?.quantity}
                      </span>
                      <img className="img-fluid" src={item?.productId.images[0].url} alt="product" />
                    </div>
                    <div>
                      <h5 className="total-price">{item?.productId?.title}</h5>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="total">{item?.quantity * item?.price} vnđ</h5>
                  </div>
                </div>
                  )
                })
              }
                
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Tổng tiền:</p>
                  <p className="total-price">{total} vnđ</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Phí ship:</p>
                  <p className="mb-0 total-price">50000 vnđ</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                <h4 className="total"  style={{fontWeight:"600"}} >Tổng tiền phải thanh toán:</h4>
                <h5 className="total-price">{total?total+50000:""} vnđ</h5>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
  else{
    toast.error("Bạn chưa đăng nhập")
  }
  
};

export default Checkout;
