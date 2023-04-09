import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeUserCart, updateUserCart } from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartdetail, setcartdetail] = useState(null);
  const [total, settotal] = useState(null);
  useEffect(() => {
    
    dispatch(getUserCart())
  },[]);
  useEffect(() => {
    if(cartdetail!==null){
      dispatch(updateUserCart({cartId:cartdetail?.cartId,quantity:cartdetail?.quantity}))
      setTimeout(()=>{
        dispatch(getUserCart()) 
      },200)
    }
    
  },[cartdetail]);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  
  const deleteCartProduct = (id) => {
    dispatch(removeUserCart(id))
    setTimeout(()=>{
      dispatch(getUserCart()) 
    },50)
  }

  useEffect(() => {
    let sum =0;
    for(let index = 0; index < userCartState?.length; index++){
      sum= sum + (Number(userCartState[index].quantity*userCartState[index].price))
      settotal(sum)
    }
    
  },[userCartState]);
  
  // console.log(userCartState)
    console.log(userCartState)
    return (
      <>
        <Container class1="cart-wrapper home-wrapper-2 py-5">
          <h3 style={{fontWeight:"600", textAlign:"center", marginBottom:"40px", color:"red"}}>GIỎ HÀNG</h3>
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center" >
                <h4 className="cart-col-1" style={{fontSize:"20px", fontWeight:"600", paddingLeft:"200px"}}>Sản phẩm</h4>
                <h4 className="cart-col-2" style={{fontSize:"20px", fontWeight:"600", paddingLeft:"20px"}}>Giá</h4>
                <h4 className="cart-col-3" style={{fontSize:"20px", fontWeight:"600", paddingLeft:"10px"}}>Số lượng</h4>
                <h4 className="cart-col-4" style={{fontSize:"20px", fontWeight:"600", paddingLeft:"5px"}}>Thành tiền</h4>
              </div>
              {userCartState && userCartState?.map((item, index) => {
                return(
                  <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center" key = {index}>
                <div className="cart-col-1 gap-15 d-flex align-items-center">
                  <div className="w-25">
                    <img src={item?.productId.images[0].url} className="img-fluid" alt="productimage" />
                  </div>
                  <div className="w-75">
                    <p style={{fontSize:"20px"}}>{item?.productId.title}</p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">{item?.price} vnđ</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      id=""
                      value={cartdetail? cartdetail.quantity: item?.quantity}
                      onChange={(e)=>{setcartdetail({cartId:item?._id,quantity:e.target.value})}}
                    />
                  </div>
                  <div>
                    <AiFillDelete onClick={()=>{deleteCartProduct(item?._id)}} className="text-danger " />
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">{item?.price * item?.quantity} vnđ</h5>
                </div>
              </div>
                )
              })}
              
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Tiếp tục mua sắm
                </Link>
                {
                  (total !== null || total !== 0) &&
                  <div className="d-flex flex-column align-items-end" style={{marginRight:"30px"}}>
                    <h4 style={{fontWeight:"600"}}>Tổng tiền: {userCartState?.length===0 ? 0 : total} vnđ</h4>
                    <p>Thuế và vận chuyển được tính khi thanh toán</p>
                    <Link to="/checkout" className="button">
                      Thanh toán
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

export default Cart;
