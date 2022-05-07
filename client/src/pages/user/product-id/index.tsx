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
          notification.success({ message: "Đã thêm sản phẩm vào giỏ hàng" });
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
      title: "Chất lượng sản phẩm?",
      text: "Sản phẩm luôn được kiểm định, đánh giá với chất lượng cao nhất trước khi đến tay khách hàng!",
    },
    {
      icon: <FontAwesomeIcon icon={faMedal} />,
      title: "Hàng có sẵn không?",
      text: "Sản phẩm hiện có sẵn tại xưởng sản xuất và online tại website.",
    },
    {
      icon: <FontAwesomeIcon icon={faThumbsUp} />,
      title: "Bảo hành sản phẩm",
      text: "Sản phẩm được bảo hành trong 30 ngày với bất kỳ lỗi nào.",
    },
    {
      icon: <FontAwesomeIcon icon={faClock} />,
      title: "Thời gian giao hàng?",
      text: "Chúng tôi sử dụng đơn vi vận chuyển uy tín và nhanh chóng nhất, thời dự kiến từ 3-6 ngày tuy khu vực.",
    },
    {
      icon: <FontAwesomeIcon icon={faTimes} />,
      title: "Thời gian làm việc?",
      text: "Hệ thống cửa hàng và Online làm việc từ 8:30 - 22:00 hàng ngày.",
    },
    {
      icon: <FontAwesomeIcon icon={faHistory} />,
      title: "Đổi hàng như thế nào?",
      text: "Việc đổi hàng rất dễ dàng và chúng tôi luôn muốn khách hàng ưng ý nhất. Hãy liên hệ fanpage để đổi!",
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
          <h5 className="note-content_title">Mô tả</h5>
          <p className="description-text mt-5">
            * {renderDescription(product.description)}
          </p>
        </div>
        <div className="col-6 description-product">
          <div className="description-product_layout">
            <h2 className="description-product_title">{product.title}</h2>
            
            <p>
              <span className="description-product_price">
                {product.price}đ
              </span>{" "}
              <span className="description-product_price-sale">
                {product.price_sale}vnđ
              </span>
            </p>
            <h5 className="description-product_label">Màu khung</h5>
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
                Còn {selectColor && product?.number_product[`${selectColor}`]}{" "}
                sản phẩm
              </div>
            )}
            <h5 className="description-product_label">Kích cỡ</h5>
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
            <h5 className="description-product_label">Số lượng</h5>
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
                <span>Giao tận nhà - Đổi trả dễ dàng</span>
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
                <Panel header="Chính sách giao hàng & đổi trả" key="1">
                  <div className="exchange">
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faTruck} />{" "}
                      <span>Giao hàng hoàn toàn miễn phí 100%</span>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faShieldAlt} />{" "}
                      <span>An toàn với nhận hàng và trả tiền tại nhà</span>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faExchangeAlt} />{" "}
                      <span>Bảo hành trọn đời nếu do lỗi của nhà sản xuất</span>
                    </div>
                  </div>
                </Panel>
                <Panel header="Hướng dẫn bảo quản" key="2">
                  <div className="preservation">
                    <p className="preservation-label">
                      * Trước hết hãy dùng một chiếc cọ lớn - loại dùng quét sơn, quét sơ qua toàn bộ bức tranh để lấy đi bớt phần lớn bụi
                    </p>
                    <p className="preservation-label">
                      * Xịt nước rửa kính lên bề mặt kính, sau đó vo một mảnh giấy báo (loại nhám thông thường) và lau theo đường xoáy trôn ốc từ trong ra cho đến khi bề mặt kính sạch và bóng.
                    </p> 
                    <p className="preservation-label">
                      * Lau phần khung gỗ/poly bằng khăn mềm, mịn và ẩm để tránh trầy xước và lấy đi phần bụi còn bám lại.
                    </p> 
                    <p className="preservation-label">
                      * Lau lại bằng khăn mềm, khô.
                    </p>                                       
                  </div>
                </Panel>
              </Collapse>
              <h5 className="contact-switchboard mt-3">
                Tổng đài bán hàng{" "}
                <span>
                  <i className="fas fa-phone-square-alt"></i> 035.397.xxxx
                </span>
              </h5>
              <p className="contact-text">Hỗ trợ 24/7 mỗi ngày</p>
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
