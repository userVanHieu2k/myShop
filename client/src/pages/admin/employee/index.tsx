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
import { SUCCESS } from "../../../constants";
import { Irespone } from "../../../constants/interface";
import ModalEditEmployee from "./modalEdit";
import LoadingPage from "../../../components/LoadingPage";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonCustom from "../../../components/Button";
import FormatMoney from "../../../components/format-money";

const Employee = () => {
  const [employee, setEmployee] = useState<
    {
      name: string;
      date_birth: string;
      home_town: string;
      address: string;
      gender: number;
      phone: string;
      date_join: string;
      rate: number;
    }[]
  >([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [keySearch, setKeySearch] = useState("");

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
      key: "name",
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      key: "date_birth",
      title: "Ngày sinh",
      dataIndex: "date_birth",
    },
    {
      key: "home_town",
      title: "Quê quán",
      dataIndex: "home_town",
    },
    {
      key: "address",
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      key: "gender",
      title: "Giới tính",
      dataIndex: "gender",
      render: (text: string, record: any, index: number) => (
        <div>{record.gender === 0 ? "Nam" : "Nữ"}</div>
      ),
    },
    {
      key: "phone",
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      key: "date_join",
      title: "Ngày vào làm",
      dataIndex: "date_join",
    },
    {
      key: "rate",
      title: "Lương cơ bản",
      dataIndex: "rate",
      render: (text: string, record: any, index: number)=>(
        <FormatMoney money={record.rate}/>
      )
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
              setEdit(true);
            }}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const getAllemployee = () => {
    apis.getEmployee().then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        setEmployee(data.data.reverse());
        setLoading(false);
      }
    });
  };

  React.useEffect(() => {
    getAllemployee();
  }, []);

  const DeleteProduct = (id: string) => {
    apis.deleteEmployee(id).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        notification.success({message: 'Xóa nhân viên thành công'})
        const newArray = employee.filter((item: any) => item._id !== id);
        setEmployee(newArray);
      }
    });
  };

  const EditEmployee = (e: any) => {
    apis.updateEmployee(e).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        const newArray: any = employee?.map((el: any) => {
          if (el._id === e._id) {
            return {
              ...el,
              name: e.name,
              date_birth: e.date_birth,
              home_town: e.home_town,
              address: e.address,
              gender: e.gender,
              phone: e.phone,
              date_join: e.date_join,
              rate: e.rate,
            };
          } else return el;
        });
        setEmployee(newArray);
        notification.success({ message: "Cập nhật nhân viên thành công" });
        setVisible(false);
      }
    });
  };

  const CreateEmployee = (e: any) => {
    setVisible(false);
    apis.createEmployee(e).then((resp: any) => {
      if (resp?.data.status === SUCCESS) {
        notification.success({message: "Thêm nhân viên thành công"})
        getAllemployee();
      }
    });
  };

  const handleSearchChange = (e: any) => {
    setKeySearch(e.target.value);
    if (e.target.value === "") {
      getAllemployee();
    }
  };

  const handleSearch = () => {
    apis.searchEmployee(keySearch).then((resp: any) => {
      setEmployee(resp?.data?.data?.reverse());
    });
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form style={{ width: "40%", display: "flex" }}>
          <Form.Item style={{ width: "80%" }}>
            <Input
              placeholder="Nhập tên nhân viên"
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
          + Thêm nhân viên
        </ButtonCustom>
      </div>

      <Table
        style={{ width: "100%", marginTop: 10 }}
        columns={columns}
        dataSource={employee}
      />
      {visible ? (
        <ModalEditEmployee
          data={data}
          edit={edit}
          visible={true}
          setEdit={setEdit}
          setVisible={setVisible}
          EditEmployee={EditEmployee}
          CreateEmployee={CreateEmployee}
        />
      ) : null}
    </div>
  );
};
export default Employee;
