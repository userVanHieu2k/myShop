import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Select, Radio } from "antd";
import UploadFile from "../../../../components/uploadFile";
import apis from "../../../../api";
import { SUCCESS } from "../../../../constants";
import LoadingPage from "../../../../components/LoadingPage";
import UploadListFile from "../../../../components/uploadListImageProduct";
interface Props {
  form?: any;
  setUrl?: any;
  handleSubmit: (e: any) => void | undefined;
  visible?: boolean;
  // setVisible?: any;
  setVisible: (e: boolean) => void | undefined;
  edit?: boolean;
  dataEdit?: any;
  setEdit?: any;
  handleEdit: (e: any) => void | undefined;
  url?: string;
  listUrl?: { url: string }[];
  setListUrl?: any;
  shoeType?: string;
  setShoeType?: any;
}
const { Option } = Select;
const ModalCreateProduct = (props: Props) => {
  const {
    form,
    url,
    setUrl,
    handleSubmit,
    handleEdit,
    visible,
    setVisible,
    edit,
    dataEdit,
    setEdit,
    listUrl,
    setListUrl,
    shoeType,
    setShoeType,
  } = props;
  const [colorSelect, setColorSelect] = useState<{}[]>([]);
  const [numberProduct, setNumberProduct] = useState<any>({});
  const CreateProduct = (e: any) => {
    if (edit) {
      if (e.price_sale) {
        handleEdit({
          id: dataEdit._id,
          e,
          number_product: numberProduct,
          percent_sale: Math.ceil((1 - e.price_sale / e.price) * 100),
        });
      } else
        handleEdit({
          id: dataEdit._id,
          e,
          percent_sale: null,
          number_product: numberProduct,
        });
      setEdit(false);
    } else if (!edit) {
      handleSubmit({ ...e, number_product: numberProduct });
    }
  };
  const onChangeProduct = (e: any) => {
    setShoeType(e.target.value);
  };
  const handleCheck = (e: any) => {};

  const handleChangeColor = (e: any) => {
    setColorSelect(e);
  };

  const handleChangeNumber = (key: string) => (value: any) => {
    setNumberProduct({ ...numberProduct, [key]: Number(value.target.value) });
  };

  const handleChangeSize = (e: any) => {};
  React.useEffect(() => {
    if (url && listUrl) {
      form.setFieldsValue({ image: url, list_image: listUrl });
    }
    if (edit) {
      form.setFieldsValue(dataEdit);
      setUrl(dataEdit.image);
      setListUrl(dataEdit.list_image);
      setShoeType(dataEdit.shoe_type);
      setColorSelect(dataEdit.color);
      setNumberProduct(dataEdit.number_product);
    }
  }, [url, form, edit, listUrl]);
  return (
    <Modal
      width="60%"
      footer={null}
      visible={visible}
      onCancel={() => {
        setEdit(false);
        setUrl("");
        setListUrl([]);
        setVisible(false);
        form.resetFields();
      }}
    >
      <Form form={form} onFinish={CreateProduct}>
        <Form.Item
          label="Tên sản phẩm"
          name="title"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả chi tiết"
          name="description"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Giá khuyến mãi" name="price_sale">
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại sản phẩm"
          name="shoe_type"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Radio.Group onChange={onChangeProduct} value={shoeType}>
            <Radio value={1}>Tranh đính đá</Radio>
            <Radio value={2}>Tranh làng quê</Radio>
            <Radio value={3}>Tranh chân dung</Radio>
            <Radio value={4}>Tranh phong cảnh</Radio>
            <Radio value={5}>khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Hình ảnh sản phẩm"
          name="image"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <UploadFile url={url} setUrl={setUrl} />
        </Form.Item>
        <Form.Item
          label="Hình ảnh chi tiết sản phẩm"
          name="list_image"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <UploadListFile
            edit={edit}
            listUrl={listUrl}
            setListUrl={setListUrl}
          />
        </Form.Item>
        <Form.Item label="Màu khung" name="color">
          <Select
            value={dataEdit && dataEdit.color}
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select color"
            onChange={handleChangeColor}
            optionLabelProp="label"
          >
            <Option value="đen" label="Đen">
              <div className="demo-option-label-item">Đen</div>
            </Option>
            <Option value="xám" label="Xám">
              <div className="demo-option-label-item">Xám</div>
            </Option>
            
            
          </Select>
        </Form.Item>
        <Form.Item label="Số lượng">
          {colorSelect?.map((item: any, index: number) => (
            <Form.Item label={item}>
              <Input
                value={numberProduct && numberProduct[item]}
                type="number"
                onChange={handleChangeNumber(item)}
              />
            </Form.Item>
          ))}
        </Form.Item>
        <Form.Item name="size" label="Size Tranh">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select size"
            onChange={handleChangeSize}
            optionLabelProp="label"
          >
            <Option value="74 x 77cm" label="74 x 77cm">
              <div className="demo-option-label-item">74 x 77cm</div>
            </Option>
            <Option value="75 x 105cm" label="75 x 105cm">
              <div className="demo-option-label-item">75 x 105cm</div>
            </Option>
            <Option value="93x148cm" label="93x148cm">
              <div className="demo-option-label-item">93x148cm</div>
            </Option>
            <Option value="42x48cm" label="42x48cm">
              <div className="demo-option-label-item">42x48cm</div>
            </Option>
            <Option value="56x56cm" label="56x56cm">
              <div className="demo-option-label-item">56x56cm</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Hoàn thành
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreateProduct;
