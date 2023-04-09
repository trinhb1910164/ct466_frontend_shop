import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useSelector } from "react-redux";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state.product.products);
  
  return (
    <>
      <h3 style={{fontWeight:"600", textAlign:"center", margin:"20px 0", color:"red"}}>SẢN PHẨM</h3>
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0" style={{marginLeft:"30px"}}>{productState?.length} Sản Phẩm</p>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <div className="d-flex gap-10 align-items-center grid" style={{marginRight:"30px"}}>
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard  grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
