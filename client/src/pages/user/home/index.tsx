import React, { useState, useRef } from "react";
import { Image, Pagination } from "antd";
import "./style.scss";
import apis from "../../../api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player/lazy";
import { Link } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Irespone } from "../../../constants/interface";
import { SUCCESS } from "../../../constants";
const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [productHightLight, setProductHightLight] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const message: any = useRef();
  const handleChangePage = (page: number) => {
    setCurrent(page);
    setLoading(true);
    apis.getProductPage(page).then((resp: any) => {
      setProduct(resp.data.product);
      setLoading(false);
    });
  };
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  React.useEffect(() => {
    apis.getProductPage(1).then((resp: any) => {
      if (resp) {
        setProduct(resp.data.product);
        setLoading(false);
      }
    }).catch((err: any) => {
      setLoading(false)
    });
  }, []);

  React.useEffect(() => {
    apis.getProductHightLight().then(({ data }: { data: Irespone }) => {
      if (data?.status === SUCCESS) {
        setProductHightLight(data?.data[0]?.item);
      }
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="home-page container">
        <div className="row">
          <div className="home-slide">
            <Image src="https://xuongtranhgiahan.com/wp-content/themes/giahan/assets/img/bg-about-1.jpg" />
            <div className="d-flex">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/ship.png" />
                <h5>Giao h??ng to??n qu???c</h5>
                <p>V???n chuy???n kh???p Vi???t Nam</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/payment.png" />
                <h5>Thanh to??n khi nh???n h??ng</h5>
                <p>Nh???n h??ng t???i nh?? r???i thanh to??n</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/warranty.png" />
                <h5>B???o h??nh d??i h???n</h5>
                <p>B???o h??nh l??n ?????n 60 ng??y</p>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 card-intro">
                <img src="/images/change_product.png" />
                <h5>?????i h??ng d??? d??ng</h5>
                <p>?????i h??ng tho???i m??i trong 30 ng??y</p>
              </div>
            </div>
          </div>
          <div className="home-content">
            <h2 className="home-content-title">S???n ph???m n???i b???t</h2>
            <div className="row">
              {Array.isArray(productHightLight) &&
                productHightLight.length > 0 &&
                productHightLight?.map((item: any, index: number) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-card"
                    key={`card_${item._id}`}
                  >
                    <div>
                      <Link to={`/product/${item._id}`}>
                        <img width="100%" src={item.image} />
                      </Link>
                      {item.percent_sale && (
                        <span className="product-card_percent">
                          Gi???m {item.percent_sale}%
                        </span>
                      )}
                      <p className="product-card_title">{item.title}</p>
                      <p>
                        <span className="product-card_price-sale">
                          {item.price_sale && `${item.price_sale}??`}
                        </span>{" "}
                        <span
                          className={
                            item.price_sale
                              ? "product-card_price"
                              : "product-card_price-bold"
                          }
                        >
                          {item.price && item.price}??
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="home-content">
            <h2 className="home-content-title">S???n ph???m c???a shop</h2>
            <div className="row">
              {Array.isArray(product) &&
                product.length > 0 &&
                product?.map((item: any, index: number) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-card"
                    key={`card_${item._id}`}
                  >
                    <div>
                      <Link to={`/product/${item._id}`}>
                        <img width="100%" src={item.image} />
                      </Link>
                      {item.percent_sale ? (
                        <span className="product-card_percent">
                          Gi???m {item.percent_sale}%
                        </span>
                      ) : null}
                      <p className="product-card_title">{item.title}</p>
                      <p>
                        <span className="product-card_price-sale">
                          {item.price_sale && `${item.price_sale}??`}
                        </span>{" "}
                        <span
                          className={
                            item.price_sale
                              ? "product-card_price"
                              : "product-card_price-bold"
                          }
                        >
                          {item.price && item.price}??
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            {product ? (
              <Pagination
                current={current}
                onChange={handleChangePage}
                total={50}
              ></Pagination>
            ) : null}
          </div>
          <div className="home-feedback">
            <h2 className="home-content-title">Kh??ch h??ng n??i g?? v??? shop</h2>
            <Carousel
              showThumbs={false}
              centerSlidePercentage={3}
              selectedItem={3}
              showStatus={false}
              showArrows={false}
              emulateTouch={true}
              infiniteLoop={true}
              onChange={(e) => {}}
            >
              <div className="slide-item">
                <div>
                  <p>
                    Tranh b??n shop c?? nhi???u m???u ?????p l???m
                  </p>
                </div>
                <span>Hi???u Nguy???n</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    Em mua tranh c???a shop c??ch ????y 2 days ???? R???t ?????p
                    ???.Giao h??ng c??ng r???t nhanh. M???i ng?????i nh??? gh?? ???ng h??? shop
                    nh?? ????. C?? d???p em s??? gh?? l???i shop!
                  </p>
                </div>
                <span>Nguy???n Th??? Hoa</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    M???i mua n??n ch??a bi???t ????? b???n th??? n??o nh??ng tranh ?????p, ????ng
                    ?????t khuy???n m??i n??n gi?? r???, ch??? shop nhi???t t??nh, shop nhi???u
                    qu?? t???ng v?? ??u ????i.
                  </p>
                </div>
                <span>Nguy???n Th??? Thanh</span>
              </div>
              <div className="slide-item">
                <div>
                  <p>
                    {" "}
                    2 l???n mua ??? shop r???i ch???t l?????ng v?? m???i th??? ?????u Oke ???ng h???
                    shop d??i.
                  </p>
                </div>
                <span>Ho??ng Minh T??n</span>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="home-count">
        <div className="container px-0">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 pl-0">
              <p className="text-intro">
                GIA HAN lu??n mang ?????n cho kh??ch h??ng nh???ng s???n ph???m ch???t l?????ng
                t???t nh???t v???i gi?? c??? h??p l?? nh???t ?????n tay ng?????i ti??u d??ng v???i
                ph????ng ch??m thu???n mua v???a b??n v?? ch???t l?????ng lu??n ?????t l??n h??ng
                ?????u .
              </p>
              <h1>1 349</h1>
              <p className="text-description">S??? S???n ph???m ???? b??n</p>
              <h1>567</h1>
              <p className="text-description">Kh??ch H??ng ???? Mua</p>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 pr-0">
              <ReactPlayer
                width="100%"
                height="400px"
                url="https://www.youtube.com/watch?v=bDKTQ-DU8BY"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
