import React, { useState } from "react";
import apis, { deleteProduct } from "../../../api";
import { Button, notification, Popconfirm } from "antd";
import { Irespone } from "../../../constants/interface";
import "./style.scss";
import { useHistory } from "react-router";
import { SUCCESS } from "../../../constants";
import LoadingPage from "../../../components/LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormatMoney from "../../../components/format-money";
const StoreProduct = () => {
  const userId = localStorage.getItem("id");
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const history = useHistory();
  React.useEffect(() => {
    if (userId) {
      apis.getStore(userId).then(({ data }: { data: Irespone }) => {
        setLoading(false);
        if (data?.data?.store !== [null] && data?.data?.store?.length > 0) {
          setStore(data?.data?.store);
          const counts =
            data?.data?.store.length > 0 &&
            data?.data?.store.map((el: any) => el.price_sale * el.total);
          let i;
          let countsss = 0;
          for (i = 0; i < counts.length; i++) {
            countsss = countsss + counts[i];
          }
          setCount(countsss);
        }
      });
    }
  }, []);

  const handlePayment = () => {
    history.push("/payment", {
      sum_price: count,
      store,
    });
  };
  const deleteProduct = (id: String, product: any) => {
    apis
      .deleteProductStore({ userId, idProduct: id })
      .then(({ data }: { data: Irespone }) => {
        if (data.status === SUCCESS) {
          const newStore = store.filter((item: any) => item._id !== id);
          setStore(newStore);
          notification.success({
            message: "Xóa sản phẩm thành công",
          });
        }
      });
    apis.addNumberProduct({
      productId: product.productId,
      total: product.total,
      color: product.color,
    });
  };

  const deleteAllProduct = () => {
    apis.deleteStore(userId).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        setStore([]);
        notification.success({
          message: "Xóa sản phẩm thành công",
        });
      }
    });
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="store-user">
      <Button
        className="btn-follow"
        onClick={() => history.push("/order-form")}
      >
        <i className="fas fa-plus-square pr-2"></i> Theo dõi đơn hàng
      </Button>
      {store.length < 1 ? (
        <div className="w-50">
          <div>Chưa có sản phẩm nào trong giỏ hàng</div>

          <Button
            onClick={() => history.push("/")}
            className="btn-payment mt-5 w-50"
          >
            Quay lại trang chủ
          </Button>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Hình ảnh</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th>
                  <Popconfirm
                    title="Bạn có chắc chắc muốn xóa tất cả sản phẩm"
                    onConfirm={deleteAllProduct}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button style={{ border: "none", color: "#c51212" }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Popconfirm>
                </th>
              </tr>
            </thead>

            <tbody>
              {store.length > 0 &&
                Array.isArray(store) &&
                store?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.nameproduct}</td>
                    <td>{item.price_sale}đ</td>
                    <td>
                      <img width={50} src={item.image} />
                    </td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.total}</td>
                    <td>
                      <FormatMoney money={item.price_sale * item.total} />
                    </td>
                    <td>
                      <Popconfirm
                        title="Bạn có chắc chắc muốn xóa sản phẩm này"
                        onConfirm={() => deleteProduct(item._id, item)}
                        okText="Đồng ý"
                        cancelText="Hủy"
                      >
                        <Button style={{ border: "none", color: "#c51212" }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              <tr>
                <td>
                  <Button
                    className="btn-add-product"
                    onClick={() => history.push("/")}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Mua thêm
                  </Button>
                </td>
                <td colSpan={2}>
                  <Button onClick={handlePayment} className="btn-payment">
                    Thanh toán
                  </Button>
                </td>

                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    SUM = <FormatMoney money={count} />
                  </strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StoreProduct;
