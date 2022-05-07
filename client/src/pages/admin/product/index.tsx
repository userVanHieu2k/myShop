import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  Table,
  Popconfirm,
  Image,
  notification,
} from "antd";
import UploadFile from "../../../components/uploadFile";
import ModalCreateProduct from "./modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apis, { getProductHightLight } from "../../../api";
import ModalAntd from "../../../components/Modal";
import { SUCCESS } from "../../../constants";
import "./style.scss";
import LoadingPage from "../../../components/LoadingPage";
import ButtonCustom from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useCallback } from "react";
import { useEffect } from "react";
import { Irespone } from "../../../constants/interface";

const ManageProduct = () => {
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [product, setProduct]: any = useState([]);
  const [listUrl, setListUrl]: any = useState([]);
  const [productHightlight, setProductHightlight]: any = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [recordId, setRecordId] = useState("");
  const [editProductHightLight, setEditProductHightLight] =
    useState<boolean>(false);
  const [shoeType, setShoeType] = useState("");
  const handleSubmit = (e: any) => {
    setVisible(false);
    console.log(e);
    apis.createProduct(e).then((resp: any) => {
      if (resp?.data.status === SUCCESS) {
        notification.success({ message: "Create product success" });
        if (e.price_sale) {
          setProduct([
            ...product,
            {
              ...e,
              percent_sale: Math.ceil((1 - e.price_sale / e.price) * 100),
            },
          ]);
        } else setProduct([...product, { ...e, percent_sale: null }]);
      }
    });
    form.resetFields();
    setUrl("");
    setListUrl("");
  };
  const handleGetProduct = () => {
    apis.getProduct().then((resp) => {
      if (resp) {
        setLoading(false);
      }
      if (resp.data.status === SUCCESS) {
        setProduct(resp.data.data.reverse());
      }
    });
  };
  React.useEffect(() => {
    apis.getProduct().then((resp) => {
      if (resp) {
        setLoading(false);
      }
      if (resp.data.status === SUCCESS) {
        setProduct(resp.data.data.reverse());
      }
    });
  }, []);

  const handleCheckProduct = (record: any, e: any) => {
    if (e.target.checked) {
      setProductHightlight([...productHightlight, record]);
    } else {
      const newArray = productHightlight.filter(
        (item: any) => item._id !== record._id
      );
      setProductHightlight(newArray);
    }
  };

  console.log(productHightlight);
  const columns = [
    {
      key: 0,
      title: "STT",
      render: (text: string, record: any, index: number) => (
        <div>{index + 1}</div>
      ),
    },
    {
      key: 1,
      title: "Sản phẩm nổi bật",
      render: (text: string, record: any, index: number) => (
        <div>
          <Checkbox
            checked={productHightlight.some(
              (item: any) => item._id === record._id
            )}
            onChange={(e: any) => handleCheckProduct(record, e)}
          />
        </div>
      ),
    },
    {
      key: 2,
      title: "Name product",
      dataIndex: "title",
    },
    {
      key: 3,
      title: "Description",
      dataIndex: "description",
    },
    {
      key: 4,
      title: "Price",
      dataIndex: "price",
    },
    {
      key: 5,
      title: "Price Sale",
      dataIndex: "price_sale",
    },
    {
      key: 6,
      title: "Percent Sale",
      dataIndex: "percent_sale",
    },
    {
      key: 7,
      title: "image",
      dataIndex: "image",
      render: (text: string, record: any, index: number) => (
        <Image width={40} src={record.image} />
      ),
    },
    {
      key: 8,
      title: "",
      render: (text: string, record: any, index: number) => (
        <div style={{ display: "flex" }}>
          <Popconfirm
            onConfirm={() => DeleteProduct(record?._id)}
            placement="leftTop"
            title="Bạn chắc chắn muốn xóa sản phẩm này ?"
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn-delete" shape="circle">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            className="ml-2"
            onClick={() => onOpenEdit(record)}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const DeleteProduct = (e: any) => {
    apis.deleteProduct({ id: e }).then((resp: any) => {
      if (resp.data.status === SUCCESS) {
        notification.success({ message: "Delete success" });
        const dataNew = product?.filter((el: any) => el._id !== e);
        setProduct(dataNew);
      }
    });
  };

  const onOpenEdit = (e: any) => {
    setEdit(true);
    setVisible(true);
    setDataEdit(e);
    console.log(e);
  };

  const handleEdit = (e: any) => {
    setVisible(false);
    setEdit(false);
    apis
      .updateProduct({
        id: e.id,
        data: { ...e?.e, number_product: e.number_product },
      })
      .then((resp: any) => {
        if (resp?.data.status === SUCCESS) {
          notification.success({ message: "Edit success" });
          const dataNew = product.map((el: any) => {
            if (el?._id === e.id) {
              const elNew = e?.e;
              console.log(e);
              return {
                ...elNew,
                _id: el._id,
                percent_sale: e.percent_sale,
                number_product: e.number_product,
              };
            }
            return el;
          });
          setProduct(dataNew);
        }
      });
    form.resetFields();
    setUrl("");
    setListUrl("");
  };

  const handleProductHightLinght = useCallback(() => {
    if (!editProductHightLight && productHightlight.length > 0) {
      apis
        .createProductHightLight({ item: productHightlight })
        .then((res) =>
          notification.success({ message: "Tạo sản phẩm nổi bật thành công" })
        )
        .catch((err) =>
          notification.error({ message: "Lỗi", description: err.message })
        );
    } else if (editProductHightLight && productHightlight.length > 0) {
      apis
        .updateProductHightLight({ item: productHightlight, _id: recordId })
        .then((res) =>
          notification.success({
            message: "Cập nhật sản phẩm nổi bật thành công",
          })
        );
    }
  }, [productHightlight, editProductHightLight]);

  const handleSearchChange = (e: any) => {
    setKeySearch(e.target.value);
    if (e.target.value === "") {
      handleGetProduct();
    }
  };

  const handleSearch = () => {
    apis.searchProduct(keySearch).then((resp: any) => {
      setProduct(resp.data.result);
    });
  };

  useEffect(() => {
    apis.getProductHightLight().then(({ data }: { data: Irespone }) => {
      if (data?.status === SUCCESS && data?.data?.length > 0) {
        setEditProductHightLight(true);
        setProductHightlight(data?.data[0]?.item);
        setRecordId(data?.data[0]?._id);
      }
    });
  }, []);

  // if(loading){
  //   return <LoadingPage />
  // }
  return (
    <>
      <div className="d-flex justify-content-between pt-4">
        <Form style={{ width: "40%", display: "flex" }}>
          <Form.Item style={{ width: "80%" }}>
            <Input
              onChange={handleSearchChange}
              placeholder="Nhập tên sản phẩm tìm kiếm"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ borderLeft: "none", height: "40px" }}
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form.Item>
        </Form>
        <div>
          <ButtonCustom mode="dark" onClick={handleProductHightLinght}>
            {!editProductHightLight
              ? "Tạo sản phẩm nổi bật"
              : "Cập nhật sản phẩm nổi bật"}
          </ButtonCustom>
          <ButtonCustom mode="blue" onClick={() => setVisible(true)}>
            + Thêm sản phẩm
          </ButtonCustom>
        </div>

        {visible && (
          <ModalCreateProduct
            handleEdit={handleEdit}
            setEdit={setEdit}
            dataEdit={dataEdit}
            edit={edit}
            visible={visible}
            setVisible={setVisible}
            form={form}
            url={url}
            setUrl={setUrl}
            shoeType={shoeType}
            setShoeType={setShoeType}
            listUrl={listUrl}
            setListUrl={setListUrl}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="product-content pt-3">
        <Table columns={columns} dataSource={product} size="middle" />
      </div>
    </>
  );
};

export default ManageProduct;
