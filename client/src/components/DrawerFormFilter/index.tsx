import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apis from "../../api";
import { Irespone } from "../../constants/interface";
import FormatMoney from "../format-money";
import LoadingPage from "../LoadingPage";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCustom from "../Button";
const { Option } = Select;

interface PropsDrawer {
  visible?: boolean;
  setVisible?: any;
}
const DrawerFormFilter = (props: PropsDrawer) => {
  const history = useHistory();
  const { visible, setVisible } = props;
  const [data, setData] = useState<
    {
      color: any;
      createdAt: string;
      description: string;
      image: string;
      percent_sale: number;
      size: any;
      title: string;
      updatedAt: string;
      _id: string;
      price: number;
      price_sale: number;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const handleGotoDetail = (id: string) => {
    history.push(`/product/${id}`);
    onClose();
  };
  const handleSearch = (e: any) => {
    let keySearch: string | null = null;
    if (e?.target?.value) {
      keySearch = e?.target?.value;
      setLoading(true);
      setTimeout(() => {
        apis
          .searchProduct(keySearch)
          .then((data: any) => {
            console.log(data);
            if (data?.data?.result) {
              setData(data?.data?.result);
            } else setData([]);
            setLoading(false);
          })
          .catch((err) => {
            setData([]);
            setLoading(false);
          });
      }, 3000);
    }
  };

  const handleChangePriceFilter = (value: number | string) => {
    setLoading(true);
    apis.FilterProductWithPrice(value).then(({ data }: { data: Irespone }) => {
      if (data?.data) {
        setData(data?.data);
      } else setData([]);
      setLoading(false);
    });
  };

  const loadingMarkup = loading ? <LoadingPage /> : null;
  return (
    <Drawer
      title="Tìm kiếm sản phẩm"
      width="100%"
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      {loadingMarkup}
      <Row gutter={16}>
        <Col span={isFilter ? 16 : 20}>
          <Input
            onChange={handleSearch}
            placeholder="Nhập tên sản phẩm muốn tìm kiếm"
          />
        </Col>
        <Col span={4}>
          <ButtonCustom
            onClick={() => setIsFilter(true)}
            icon={<FontAwesomeIcon icon={faFilter} />}
          >
            Lọc theo giá sản phẩm
          </ButtonCustom>
        </Col>
        {isFilter && (
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              onChange={handleChangePriceFilter}
              defaultValue=""
            >
              <Option value={1}>
                {"<"} <FormatMoney money={3000000} />
              </Option>
              <Option value={2}>
                <div>
                  <FormatMoney money={3000000} /> đến{" "}
                  <FormatMoney money={5000000} />
                </div>
              </Option>
              <Option value={3}>
                <div>
                  <FormatMoney money={5000000} /> đến{" "}
                  <FormatMoney money={10000000} />
                </div>
              </Option>
              <Option value={4}>
                {">"} <FormatMoney money={10000000} />
              </Option>
            </Select>
          </Col>
        )}
      </Row>
      <Row gutter={16}>
        {data.length > 0 && Array.isArray(data) ? (
          data?.map((item: any, index: number) => (
            <Col
              onClick={() => handleGotoDetail(item._id)}
              className="product_search-item"
              span={6}
              key={index}
            >
              <Row>
                <Col span={6}>
                  <img width="100%" src={item.image} alt="" />
                </Col>
                <Col className="product_search-content" span={18}>
                  <h5>{item.title}</h5>
                  <div className="product_search-price">
                    <span>
                      <FormatMoney money={item.price} />
                    </span>
                    <span>
                      <FormatMoney money={item.price_sale} />
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          <div className="not-result">Không có sản phẩm được tìm kiếm</div>
        )}
      </Row>
    </Drawer>
  );
};

export default DrawerFormFilter;
