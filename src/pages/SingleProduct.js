import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, rateProduct} from "../features/products/productSlice"
import { useLocation, useNavigate} from "react-router-dom";
import { addProductCart, getUserCart } from "../features/user/userSlice";
import ShowRating from "../components/ShowRating";

const SingleProduct = () => {

  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);
  const [added, setadded ]= useState(false);
  const [star, setstar] = useState(5);
  const [comment, setcomment] = useState("");
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const productState = useSelector((state) => state.product.product);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  // console.log(userCartState);
  // console.log(productState)
  // console.log(productState?.ratings)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getSingleProduct(getProductId));
  }, []);
  useEffect(() => {
    if(userCartState !== undefined){
      for (let index = 0; index < userCartState.length; index++) {
        if(getProductId === userCartState[index]?.productId?._id){
          setadded(true)
        }
        dispatch(getSingleProduct(getProductId));
      }
    }
  }, []);
  
  
  
  const uploadRating = () => {
    dispatch(rateProduct({prodId:getProductId, star:quantity,comment:comment}));
  }
  const uploadCart = () => {
    dispatch(addProductCart({productId:getProductId,quantity:quantity,price:productState?.price}));
    navigate("/cart")
  }
  
  
  if(productState?.quantity>0){
    return (
      <>
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
          <h3 style={{fontWeight:"600", textAlign:"center", marginBottom:"40px", color:"red"}}>CHI TIẾT SẢN PHẨM</h3>
          <div className="row">
            <div className="col-6">
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  <img
                    src={productState?.images[0].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[1].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[2].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[3].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">
                    {productState?.title}
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{ productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={parseFloat(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    {productState?.ratings && <>
                      <p className="mb-0 t-review">( {productState?.ratings.length} Reviews )</p>
                    </>}
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">thương hiệu :</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Xuất xứ :</h3>
                    <p className="product-data">{productState?.origin}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Trạng thái :</h3>
                    <p className="product-data" style={{color:"blue", fontSize:"20px"}}>Hàng có sẵn</p>
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {added === false && <>
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e)=>setquantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                  </>}
                    <div className={added?"ms-0":"ms-5 " + 'd-flex align-items-center gap-30 ms-5'}>
                      <button
                        className="button border-0"
                        type="button" onClick={() => {added ? navigate('/cart') : uploadCart()}}
                      >
                        {added  ? "Đến với giỏ hàng":"Thêm vào Giỏ Hàng" }
                      </button>
                    </div>
                    
                  </div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Vận chuyển và Trả hàng:</h3>
                    <p className="product-data">
                    Miễn phí vận chuyển và trả lại có sẵn trên tất cả các đơn đặt hàng! <br /> Chúng tôi vận chuyển tất cả các đơn đặt hàng nội ô thành phố <b>từ 2 đến 3 ngày làm việc!</b>

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                  {productState?.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="reviews-wrapper home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                    <div>
                      <a className="text-dark text-decoration-underline" href="">
                        Write a Review
                      </a>
                    </div>
                  {/* )} */}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form action=""  className="d-flex flex-column gap-15">
                    <div>
                    <input
                        type="number"
                        name=""
                        min={1}
                        max={5}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e)=>setstar(e.target.value)}
                        value={star}
                      />
                    </div>
                    <div>
                      <textarea
                        name="comment"
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={(e)=>setcomment(e.target.value)}
                        value={comment}
                      ></textarea>
                      <div className="error"></div>
                    </div>
                    <div className="d-flex justify-content-end">
                    <button
                        className="button border-0"
                        type="button" onClick={() => {uploadRating()}}
                      >Submit Review</button>
                    </div>
                  </form>
                </div>
                <ShowRating/>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  } else{
    return (
      <>
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
          <h3 style={{fontWeight:"600", textAlign:"center", marginBottom:"40px", color:"red"}}>CHI TIẾT SẢN PHẨM</h3>
          <div className="row">
            <div className="col-6">
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  <img
                    src={productState?.images[0].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[1].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[2].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[3].url}
                    className="img-fluid "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">
                    {productState?.title}
                  </h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{ productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={parseFloat(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    {productState?.ratings && <>
                      <p className="mb-0 t-review">( {productState?.ratings.length} Reviews )</p>
                    </>}
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">thương hiệu :</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Xuất xứ :</h3>
                    <p className="product-data">{productState?.origin}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Trạng thái :</h3>
                    <p className="product-data" style={{color:"red", fontSize:"20px"}}>Hết Hàng</p>
                  </div>
                  <div><p>Shop sẽ cập nhật hàng sớm nhất cho quý khách!</p></div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Vận chuyển và Trả hàng:</h3>
                    <p className="product-data">
                    Miễn phí vận chuyển và trả lại có sẵn trên tất cả các đơn đặt hàng! <br /> Chúng tôi vận chuyển tất cả các đơn đặt hàng nội ô thành phố <b>từ 2 đến 3 ngày làm việc!</b>

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                  {productState?.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
        <Container class1="reviews-wrapper home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                    <div>
                      <a className="text-dark text-decoration-underline" href="">
                        Write a Review
                      </a>
                    </div>
                  {/* )} */}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form action=""  className="d-flex flex-column gap-15">
                    <div>
                    <input
                        type="number"
                        name=""
                        min={1}
                        max={5}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e)=>setstar(e.target.value)}
                        value={star}
                      />
                    </div>
                    <div>
                      <textarea
                        name="comment"
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={(e)=>setcomment(e.target.value)}
                        value={comment}
                      ></textarea>
                      <div className="error"></div>
                    </div>
                    <div className="d-flex justify-content-end">
                    <button
                        className="button border-0"
                        type="button" onClick={() => {uploadRating()}}
                      >Submit Review</button>
                    </div>
                  </form>
                </div>
                <ShowRating/>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
};
}

export default SingleProduct;
