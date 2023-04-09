import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const ShowRating = () => {
  const productState = useSelector((state) => state.product.product);
  // console.log(productState)
  if(productState?.ratings.length!==0){
  const data = [];
  for (let i = 0; i < productState?.ratings.length; i++) {
    data.push({
      key: i + 1,
      firstname: productState?.ratings[i].firstname,
      star: productState?.ratings[i].star,
      comment: productState?.ratings[i].comment,
    })}
    // console.log(data);
  return (
    <>
      {  data?.map((item, index) => {
        return(
            <div className="reviews mt-4" key={index}>
                  <div className="review" >
                    <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">{item?.firstname}</h6>
                    <ReactStars
                        count={5}
                        size={24}
                        value={item?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      {item?.comment}
                    </p>
                  </div>
                </div>
        )
      })} 
    </>
  );
}
};

export default ShowRating;
