import React from "react";
import Iframe from "react-iframe";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container px-0">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 pl-0 footer-infor_shop">
            <img className="logo" src="https://xuongtranhgiahan.com/wp-content/themes/giahan/assets/img/logo-1.png" />
            <div className="d-flex mt-4">
              {/* <p className="footer-infor_shop-label">Hotline:</p> */}
              <p className="footer-infor_shop-content">Trải qua nhiều năm hình thành và phát triển, Xưởng Tranh Gia Hân đã vượt lên chính mình để khảng định là một trong những đơn vị hàng đầu về chế tác và kinh doanh tranh đá hiện nay.</p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footer-service">
            <h5>Về chúng tôi</h5>
            <div className="footer-list-option">
              <div>Giới thiệu</div>
              <div>Chính sách bảo mật</div>
              <div>Chính sách bán hàng</div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footer-service">
            <div className="footer-list-option">
              <div>Xưởng sản xuất: Tổ 16, Thị Trấn Yên Thế, Huyện Lục Yên, Tỉnh Yên Bái</div>
              <div>Showroom: 112 La Casta, KĐT Văn Phú, Phường Phú La, Quận Hà Đông, TP Hà Nội
                <a target="_blank" href="https://www.google.com/maps?cid=5319152141333424288" className="text-sm text-blue">(Xem bản đồ)</a>
              </div>
              <div>Điện thoại: 0903 489 999</div>
              <div>Email:xuongtranhgiahan@gmail.com</div>
              <div>Facebook:<a href="https://www.facebook.com/xuongtranhgiahan/">Xưởng Tranh Gia Hân</a></div>
              
            </div>
          </div>
          {/* <div className="col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 pr-0 footer-iframe">
            <h5 className="footer-iframe_title">GIAHAN trên facebook</h5>
            <Iframe
              url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMenshop-105721911609064&tabs=timeline&width=371&height=127&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="100%"
              position="relative"
              className="iframe-facebook"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Footer;
