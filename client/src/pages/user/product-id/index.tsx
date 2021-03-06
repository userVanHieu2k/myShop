import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import apis from "../../../api";
import { Image, Button, Collapse, notification } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import "./style.scss";
import "font-awesome/css/font-awesome.min.css";
import { SUCCESS } from "../../../constants";
import ReactImageZoom from "react-image-zoom";
import LoadingPage from "../../../components/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PayPalButton } from "react-paypal-button-v2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faCheckCircle,
  faTruck,
  faShieldAlt,
  faExchangeAlt,
  faAdjust,
  faMedal,
  faThumbsUp,
  faTimes,
  faClock,
  faHistory,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";
const { Panel } = Collapse;
const ProductDetail = () => {
  const params: any = useParams();
  const [product, setProduct]: any = useState("");
  const [color, setColor]: any = useState("");
  const [size, setSize]: any = useState("");
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [selectColor, setSelectColor] = useState("");
  const listImage = product?.list_image;
  const [urlShow, setUrlShow] = useState("");
  const image = { height: 800, zoomWidth: 1000 };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  // const slickSettingsVerticalNav = {
  //   arrows: false,
  //   vertical: true,
  //   slidesToShow: 4,
  //   swipeToSlide: true,
  //   focusOnSelect: true,
  //   verticalSwiping: true,
  //   asNavFor: product.list_image,
  //   // ref: slider => (this.slider1 = slider),
  // }

  // const slickSettingsVerticalMain = {
  //   arrows: false,
  //   slidesToShow: 1,
  //   asNavFor: product.list_image,
  //   // ref: slider => (this.slider2 = slider),
  // }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  React.useEffect(() => {
    apis.getProductDetail(params.id).then((resp) => {
      if (resp) {
        setProduct(resp.data.data);
        setUrlShow(resp.data.data?.list_image[0]?.url);
        setLoading(false);
      }
    });
  }, []);

  const handleColor = (e: string) => {
    setColor([{ key: e }]);
    setSelectColor(e);
  };

  const handleSize = (e: string) => {
    setSize([{ key: e }]);
  };
  const renderDescription = (value: string) => {
    if (value?.includes("\n")) {
      const data = value?.replace("\n", "\n * ");
      return data;
    }
    return value?.replace("\n", "\n * ");
    //  return data;
  };

  const handleSubtraction = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const handleAddition = () => {
    setNumber(number + 1);
  };
  console.log("product", product);
  const userId = localStorage.getItem("id");
  const id = Math.random().toString(36).substr(2, 9);
  const handleSubmit = () => {
    apis
      .CreateStore({
        id: userId,
        store: {
          _id: id,
          nameproduct: product.title,
          price_sale: product.price_sale,
          color: color[0].key,
          size: size[0].key,
          image: product.image,
          total: number,
          productId: params.id,
        },
      })
      .then((resp: any) => {
        if (resp.data.status === SUCCESS) {
          notification.success({ message: "???? th??m s???n ph???m v??o gi??? h??ng" });
          history.replace("/store");
        }
      });
    const numbers = product.number_product;
    const key = color[0].key;
    apis.apartFromNumberProduct({
      productId: params.id,
      number_product: {
        ...numbers,
        [key]: Number(numbers[key]) - Number(number),
      },
    });
  };

  const note_data = [
    {
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
      title: "Ch???t l?????ng s???n ph???m?",
      text: "S???n ph???m lu??n ???????c ki???m ?????nh, ????nh gi?? v???i ch???t l?????ng cao nh???t tr?????c khi ?????n tay kh??ch h??ng!",
    },
    {
      icon: <FontAwesomeIcon icon={faMedal} />,
      title: "H??ng c?? s???n kh??ng?",
      text: "S???n ph???m hi???n c?? s???n t???i x?????ng s???n xu???t v?? online t???i website.",
    },
    {
      icon: <FontAwesomeIcon icon={faThumbsUp} />,
      title: "B???o h??nh s???n ph???m",
      text: "S???n ph???m ???????c b???o h??nh trong 30 ng??y v???i b???t k??? l???i n??o.",
    },
    {
      icon: <FontAwesomeIcon icon={faClock} />,
      title: "Th???i gian giao h??ng?",
      text: "Ch??ng t??i s??? d???ng ????n vi v???n chuy???n uy t??n v?? nhanh ch??ng nh???t, th???i d??? ki???n t??? 3-6 ng??y tuy khu v???c.",
    },
    {
      icon: <FontAwesomeIcon icon={faTimes} />,
      title: "Th???i gian l??m vi???c?",
      text: "H??? th???ng c???a h??ng v?? Online l??m vi???c t??? 8:30 - 22:00 h??ng ng??y.",
    },
    {
      icon: <FontAwesomeIcon icon={faHistory} />,
      title: "?????i h??ng nh?? th??? n??o?",
      text: "Vi???c ?????i h??ng r???t d??? d??ng v?? ch??ng t??i lu??n mu???n kh??ch h??ng ??ng ?? nh???t. H??y li??n h??? fanpage ????? ?????i!",
    }
  ];

  if (loading) {
    return <LoadingPage />;
  }
  const slickSettingsVerticalNav = {
    arrows: false,
    vertical: true,
    slidesToShow: 2,
    swipeToSlide: true,
    focusOnSelect: true,
    verticalSwiping: true,
  };

  const handleShowImage = (url: string) => {
    setUrlShow(url);
  };

  return (
    <>
      <div className="page-detail d-flex">
        <div className="slide-image col-6">
          {urlShow && <ReactImageZoom {...image} img={urlShow} />}
          <h5 className="note-content_title">M?? t???</h5>
          <p className="description-text mt-5">
            * {renderDescription(product.description)}
          </p>
        </div>
        <div className="col-6 description-product">
          <div className="description-product_layout">
            <h2 className="description-product_title">{product.title}</h2>
            
            <p>
              <span className="description-product_price">
                {product.price}??
              </span>{" "}
              <span className="description-product_price-sale">
                {product.price_sale}vn??
              </span>
            </p>
            <h5 className="description-product_label">M??u khung</h5>
            <div className="description-product_content">
              {Array.isArray(product.color) &&
                product.color.map((el: any, index: number) => (
                  <Button
                    className={
                      color[0]?.key === el ? "btn-color" : "btn-default"
                    }
                    onClick={() => handleColor(el)}
                    key={index}
                  >
                    {el}
                  </Button>
                ))}
            </div>
            {selectColor && product?.number_product[`${selectColor}`] && (
              <div
                style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
              >
                C??n {selectColor && product?.number_product[`${selectColor}`]}{" "}
                s???n ph???m
              </div>
            )}
            <h5 className="description-product_label">K??ch c???</h5>
            <div className="description-product_content">
              {Array.isArray(product.size) &&
                product.size.map((el: any, index: number) => (
                  <Button
                    className={
                      size[0]?.key === el ? "btn-color" : "btn-default"
                    }
                    onClick={() => handleSize(el)}
                    key={index}
                  >
                    {el}
                  </Button>
                ))}
            </div>
            <h5 className="description-product_label">S??? l?????ng</h5>
            <>
              <Button onClick={handleSubtraction}>-</Button>{" "}
              <span className="px-2">{number}</span>{" "}
              <Button onClick={handleAddition}>+</Button>
            </>

            <div className="w-100">
              <Button
                onClick={handleSubmit}
                disabled={
                  !color ||
                  !size ||
                  product?.number_product[`${selectColor}`] === 0 ||
                  product?.number_product[`${selectColor}`] < number
                }
                className="btn-submit"
              >
                <p>Mua ngay</p>
                <span>Giao t???n nh?? - ?????i tr??? d??? d??ng</span>
              </Button>
              <Collapse
                className="mt-4"
                accordion
                expandIconPosition="right"
                expandIcon={(props: any) => {
                  if (props.isActive) {
                    return (
                      <a
                        style={{ color: "black", fontSize: "20px" }}
                        onClick={(e) => {}}
                      >
                        -
                      </a>
                    );
                  } else {
                    return (
                      <a
                        style={{ color: "black", fontSize: "16px" }}
                        onClick={(e) => {}}
                      >
                        +
                      </a>
                    );
                  }
                }}
              >
                <Panel header="Ch??nh s??ch giao h??ng & ?????i tr???" key="1">
                  <div className="exchange">
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faTruck} />{" "}
                      <span>Giao h??ng ho??n to??n mi???n ph?? 100%</span>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faShieldAlt} />{" "}
                      <span>An to??n v???i nh???n h??ng v?? tr??? ti???n t???i nh??</span>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faExchangeAlt} />{" "}
                      <span>B???o h??nh tr???n ?????i n???u do l???i c???a nh?? s???n xu???t</span>
                    </div>
                  </div>
                </Panel>
                <Panel header="H?????ng d???n b???o qu???n" key="2">
                  <div className="preservation">
                    <p className="preservation-label">
                      * Tr?????c h???t h??y d??ng m???t chi???c c??? l???n - lo???i d??ng qu??t s??n, qu??t s?? qua to??n b??? b???c tranh ????? l???y ??i b???t ph???n l???n b???i
                    </p>
                    <p className="preservation-label">
                      * X???t n?????c r???a k??nh l??n b??? m???t k??nh, sau ???? vo m???t m???nh gi???y b??o (lo???i nh??m th??ng th?????ng) v?? lau theo ???????ng xo??y tr??n ???c t??? trong ra cho ?????n khi b??? m???t k??nh s???ch v?? b??ng.
                    </p> 
                    <p className="preservation-label">
                      * Lau ph???n khung g???/poly b???ng kh??n m???m, m???n v?? ???m ????? tr??nh tr???y x?????c v?? l???y ??i ph???n b???i c??n b??m l???i.
                    </p> 
                    <p className="preservation-label">
                      * Lau l???i b???ng kh??n m???m, kh??.
                    </p>                                       
                  </div>
                </Panel>
              </Collapse>
              <h5 className="contact-switchboard mt-3">
                T???ng ????i b??n h??ng{" "}
                <span>
                  <i className="fas fa-phone-square-alt"></i> 035.397.xxxx
                </span>
              </h5>
              <p className="contact-text">H??? tr??? 24/7 m???i ng??y</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="note-content row px-3">
          {note_data &&
            note_data?.map((item: any, index: number) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex py-3"
                style={{ alignItems: "center" }}
                key={index}
              >
                <div className="note-content_icon">{item.icon}</div>
                <div className="note-content_text">
                  <p className="note-content_text-title mb-0">{item.title}</p>
                  <p className="note-content_text-content mb-0">{item.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
