import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";

const ProductCard = (props) => {
  const {grid } = props;
 
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  let location = useLocation();
  console.log(productState);
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      description: productState[i].description,
      totalrating: parseFloat((productState[i].totalrating)),
      price: `${productState[i].price}`,
      images:productState[i].images,
      id: productState[i]._id,
    })}
      // console.log(data);
  return (
    <>
      {  data?.map((item, index) => {
        return(
          <div
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <Link
              to={`${
                location.pathname === "/"
                  ? "/product/"+item?.id
                  : location.pathname === "/product/"+item?.id
                  ? "/product/"+item?.id
                  : item?.id
              }`}
              className="product-card scale position-relative"
            >
              <div className="product-image ">
                <img src={item?.images[0].url} className="img-fluid" alt="productimage"/>
                <img src={item?.images[1].url} className="img-fluid" alt="productimage" />
              </div>
              <div className="product-details">
                <h5 className="product-title"> {item.title} </h5>
                <h6 className="brand">Thương hiệu: {item.brand}</h6>
                <ReactStars
                  count={5}
                  size={24}
                  value={item.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>Mô tả: </p>
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{__html: item?.description}}
                ></p>
                <p className="price">Giá: {item.price} vnd</p>
              </div>
            </Link>
          </div>
        )
      })} 
    </>
  );
};

export default ProductCard;
