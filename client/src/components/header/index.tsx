import React, { useEffect, useCallback } from "react";
import { Menu, Image, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, SearchOutlined } from "@ant-design/icons";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSearch,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import DrawerFormFilter from "../DrawerFormFilter";
import apis from "../../api";

import { Irespone } from "../../constants/interface";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({});
  const userId = localStorage.getItem("id");
  const history = useHistory();
  console.log(userId);
  useEffect(() => {
    if (userId) {
      apis.getProfile(userId).then(({ data }: { data: Irespone }) => {
        setData(data.data);
      });
    }
  }, [userId]);

  const handleOpenDrawer = () => {
    setVisible(true);
  };

  const handleChangeInfo = useCallback(() => {
    history.push("/profile", { data });
  }, [data]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={handleChangeInfo}>Thay đổi thông tin</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={handleLogout}>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header-top d-flex w-100 justify-content-between">
        <h5 onClick={() => history.push("/")} className="header-title">
          Cửa hàng Gia Hân
        </h5>
        <Menu mode="horizontal" className="menu-top">
          <Menu.Item key="order">
            <Link to="/order-form">Kiểm tra đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/">Liên hệ</Link>
          </Menu.Item>

          <Menu.Item key="profile">
            {data?.firstname || data?.lastname || data?.username ? (
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <div className="fullname-profile">
                  {data?.firstname} {data?.lastname}
                  <FontAwesomeIcon icon={faSortDown} />
                </div>
              </Dropdown>
            ) : (
              <div
                className="fullname-profile"
                onClick={() => (window.location.href = "/login")}
              >
                Đăng nhập
              </div>
            )}
          </Menu.Item>
        </Menu>
      </div>
      <div className="d-flex w-100 justify-content-end header-bottom">
        <Image className="logo"
          style={{objectFit: "cover"}}
          src={`https://xuongtranhgiahan.com/wp-content/themes/giahan/assets/img/logo-1.png`}
        />
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="1">
            <Link to="/product-filter?loai-tranh=1">Tranh đính đá</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/product-filter?loai-tranh=2">Tranh làng quê</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/product-filter?loai-tranh=3">Tranh chân dung</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/product-filter?loai-tranh=4">Tranh phong cảnh</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/product-filter?loai-tranh=5">Khác</Link>
          </Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="icon">
          <Menu.Item key="point">
            <Link onClick={handleOpenDrawer}>
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </Menu.Item>
          <Menu.Item key="order">
            <Link to="/store">
              <FontAwesomeIcon icon={faCartPlus} />
            </Link>
          </Menu.Item>
        </Menu>
        {visible && (
          <DrawerFormFilter visible={visible} setVisible={setVisible} />
        )}
      </div>
    </>
  );
};

export default Header;
