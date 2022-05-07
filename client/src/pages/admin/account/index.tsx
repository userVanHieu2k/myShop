import React, { useState } from "react";
import apis from "../../../api";
import {
  Table,
  Image,
  Popconfirm,
  Input,
  Button,
  notification,
  Form,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ERROR_EXIT_ACCOUNT, SUCCESS } from "../../../constants";
import { Irespone } from "../../../constants/interface";
import ModalEditAccount from "./modalEdit";
import LoadingPage from "../../../components/LoadingPage";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCustom from "../../../components/Button";
const MangerAccount = () => {
  const [account, setAccount] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [keySearch, setKeySearch] = useState("");
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState();

  const columns = [
    {
      key: "stt",
      title: "STT",
      render: (text: string, record: any, index: number) => (
        <span key={`key--${index}`}>{index + 1}</span>
      ),
    },
    {
      key: "username",
      title: "Tài khoản",
      dataIndex: "username",
    },
    {
      key: "password",
      title: "Mật khẩu",
      dataIndex: "password",
    },
    {
      key: "rule",
      title: "Loại tài khoản",
      dataIndex: "rule",
      render: (text: string, record: any, index: number) => (
        <span key={`key--${index}`}>
          {record.rule === 1 ? "Thường" : record.rule === 2 ? "Admin": "Nhân viên"}
        </span>
      ),
    },
    {
      key: "action",
      title: "",
      render: (text: string, record: any, index: number) => (
        <div key={`key--${index}`}>
          <Popconfirm
            onConfirm={() => DeleteProduct(record?._id)}
            placement="leftTop"
            disabled={record.rule === 2}
            title="Bạn chắc chắn muốn xóa tài khoản này ?"
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={record.rule === 2}
              className="btn-delete"
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            className="ml-2"
            // disabled={record.rule === 2}
            onClick={() => {
              setVisible(true);
              setData(record);
              setEdit(true)
            }}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const getAllAccount = () => {
    apis.getAccount().then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        setAccount(data.data);
        setLoading(false);
      }
    });
  };

  React.useEffect(() => {
    getAllAccount();
  }, []);

  const DeleteProduct = (id: string) => {
    apis.deleteAccount(id).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        const newArray = account.filter((item: any) => item._id !== id);
        setAccount(newArray);
      }
    });
  };
  
  const CreateAccount = (e: any) =>{
    apis.createAccount(e).then(({data}: {data: Irespone}) => {
      console.log(data)
      if(data.status === SUCCESS){
        notification.success({message: 'Tạo tài khoản thành công'});
        getAllAccount();
      }
      else if(data.ERROR_CODE === ERROR_EXIT_ACCOUNT){
        notification.error({message: 'Tài khoản đã tồn tại'})
      }
    })
  }

  const EditAccount = (e: any) => {
    apis.editAccount(e).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        const newArray: any = account?.map((el: any) => {
          if (el._id === e.id) {
            return {
              ...el,
              username: e.username,
              password: e.password,
              rule: e.rule,
            };
          } else return el;
        });
        setAccount(newArray);
        notification.success({ message: "Edit account success" });
        setVisible(false);
      }
    });
  };

  const handleSearchChange = (e: any) => {
    setKeySearch(e.target.value);
    if (e.target.value === "") {
      getAllAccount();
    }
  };

  const handleSearch = () => {
    apis.searchAccount(keySearch).then((resp: any) => {
      setAccount(resp?.data?.result?.reverse());
    });
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Form style={{ width: "40%", display: "flex" }}>
        <Form.Item style={{ width: "80%" }}>
          <Input
            placeholder="Nhập tên tài khoản"
            onChange={handleSearchChange}
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
      <ButtonCustom mode="blue" onClick={() => setVisible(true)}>
          + Tạo tài khoản
        </ButtonCustom>
      </div>
      
      <Table
        style={{ width: "100%", marginTop: 10 }}
        columns={columns}
        dataSource={account}
      />
      {visible ? (
        <ModalEditAccount
          data={data}
          edit={edit}
          setEdit={setEdit}
          visible={visible}
          CreateAccount={CreateAccount}
          setVisible={setVisible}
          EditAccount={EditAccount}
        />
      ) : null}
    </div>
  );
};
export default MangerAccount;
