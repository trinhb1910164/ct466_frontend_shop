import React from "react";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";

const Home = () => {
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <h1 className="home-title">Chào mừng bạn đến với Đồng hồ Việt Trinh!</h1>
            <div className='col-6 introduce'> &nbsp;&nbsp;&nbsp;<b>Việt Trinh</b> là một trong những nhà bán lẻ đồng hồ đeo tay trực tuyến. Chúng tôi cung cấp chiết khấu sâu và một số mức giá thấp nhất cho đồng hồ với dịch vụ khách hàng tuyệt vời và giao hàng miễn phí toàn quốc.Chúng tôi mang theo nhiều loại Đồng hồ 
                  Citizen, Đồng hồ Seiko, Đồng hồ Casio, Đồng hồ Tissot, Đồng hồ Hamilton và nhiều thương hiệu khác. Chúng tôi cung cấp MIỄN PHÍ vận chuyển. Vì vậy, nếu bạn muốn mua đồng hồ trực tuyến thì không cần tìm đâu xa vì bạn đã đến đúng nơi!
            </div>
            <div className="col-6"><video controls src="@watch.webm" className="media video"></video></div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading" style={{fontWeight:"600"}}>SẢN PHẨM NỔI BẬT</h3>
          </div>
          <ProductCard />
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/casio.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/edifice.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/citizen.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/g-shock.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/seiko.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/orient.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/olym-pianus-2.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading" style={{fontWeight:"600"}}>SẢN PHẨM GIÁ TỐT</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
    </>
  );
};

export default Home;
