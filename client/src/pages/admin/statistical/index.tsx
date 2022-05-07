import React, { useEffect } from "react";
import apis from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDollarSign,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Irespone } from "../../../constants/interface";
import { SUCCESS } from "../../../constants";
import FormatMoney from "../../../components/format-money";
import moment from "moment";
import { Card, DatePicker } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

const MangerStatistical = () => {
  const [order, setOrder] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [product, setProduct] = useState([]);
  const [countOrderWeek, setCountOrderWeek] =
    useState<{ total: number; data: any }>();
  const [countOrderWeekOption, setCountOrderWeekOption] =
    useState<{ total: number; data: any }>();
  const [countOrderYear, setCountOrderYear] =
    useState<{ total: number; data: any }>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    apis.getOrderByMonth();
  }, []);

  useEffect(() => {
    apis.getAllOrder().then((data: any) => {
      if (data) {
        setOrder(data?.data?.data?.reverse());
        setLoading(false);
        let sumTotal = 0;
        data?.data?.data?.forEach(
          (item: any) => (sumTotal = sumTotal + item.product?.sum_price)
        );
        setTotal(sumTotal);
      }
    });
  }, []);

  React.useEffect(() => {
    apis.getAccount().then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        setAccount(data.data);
        setLoading(false);
      }
    });
  }, []);

  const curr = new Date();
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

  const handleOnchangeYear = (date: any, dateString: string) => {
    if (dateString) {
      apis
        .getOrderYear({ year: Number(dateString) })
        .then(({ data }: { data: Irespone }) => {
          if (data?.status === SUCCESS) {
            setCountOrderYear(data?.data);
          }
        });
    }
  };

  const handleChangeWeek = (date: any, dateString: string) => {
    if (dateString) {
      const year = dateString.toString().slice(0, 4);
      const week = dateString.toString().slice(5, 7);
      const getDate = getDateOfWeek(Number(week), Number(year));
      apis
        .getOrderByWeekNow({
          dateStart: getDate.getDate() - 5,
          dateEnd: getDate.getDate() + 1,
          month: getDate.getMonth() + 1,
          year: getDate.getFullYear(),
        })
        .then(({ data }: { data: Irespone }) => {
          if (data?.status === SUCCESS) {
            console.log(data);
            setCountOrderWeekOption(data?.data);
          }
        });
    }
  };

  useEffect(() => {
    apis.getProduct().then(({ data }: { data: Irespone }) => {
      if (data?.status === SUCCESS) {
        console.log(data);
        setProduct(data?.data);
      }
    });
  }, []);

  function getDateOfWeek(weekNumber: number, year: number) {
    //Create a date object starting january first of chosen year, plus the number of days in a week multiplied by the week number to get the right date.
    return new Date(year, 0, 1 + (weekNumber - 1) * 7);
  }

  useEffect(() => {
    apis
      .getOrderByWeekNow({
        dateStart: firstday.getDate(),
        dateEnd: lastday.getDate(),
        month: firstday.getMonth() + 1,
        year: firstday.getFullYear(),
      })
      .then(({ data }: { data: Irespone }) => {
        if (data?.status === SUCCESS) {
          setCountOrderWeek(data?.data);
        }
      });
  }, []);

  let count = [];
  let countTotal = 0;
  for (var i = 0; i < 7; i++) {
    count.push(countOrderWeek?.data[i].sum);
    countTotal = countTotal + countOrderWeek?.data[i].sum;
  }

  let countWeekOption = [];
  let countTotalWeekOption = 0;
  for (var i = 0; i < 7; i++) {
    if (countOrderWeekOption?.data?.length > 0) {
      countTotalWeekOption =
        countTotalWeekOption + countOrderWeekOption?.data[i].sum;
      countWeekOption.push(countOrderWeekOption?.data[i].sum);
    }
  }

  let countYearOption = [];
  let countTotalYear = 0;
  for (var i = 0; i < 7; i++) {
    if (countOrderYear?.data?.length > 0) {
      countTotalYear = countTotalYear + countOrderYear?.data[i].sum;
      countYearOption.push(countOrderYear?.data[i].sum);
    }
  }

  // const data = [1, 2, 24, 24, 42, 42, 42];
  const data = {
    labels: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
    datasets: [
      {
        label: "# of Votes",
        data: count,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataWeekOption = {
    labels: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
    datasets: [
      {
        label: "# of Votes",
        data: countWeekOption,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataYearOption = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: countYearOption,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any= {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="row list-statistical">
        <div className="col-3">
          <div className="card-infor">
            <h5>Tài khoản</h5>
            <div>{account?.length}</div>
            <div className="card-infor__icon card-infor__icon-account">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card-infor">
            <h5>Đơn hàng</h5>
            <div>{order?.length}</div>
            <div className="card-infor__icon card-infor__icon-order">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="card-infor">
            <h5>Sản phẩm</h5>
            <div>{product?.length}</div>
            <div className="card-infor__icon card-infor__icon-follow">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card-infor">
            <h5>Doanh thu</h5>
            <div>
              <FormatMoney money={total} />{" "}
            </div>
            <div className="card-infor__icon card-infor__icon-total">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Bar data={data} options={options} />
        <Card title="Thống kê theo tuần">
          <DatePicker onChange={handleChangeWeek} picker="week" />{" "}
          {countOrderWeekOption?.total && (
            <>
              <small style={{ marginLeft: "15px" }}>
                Có tổng cộng <strong>{countOrderWeekOption?.total}</strong> đơn
                hàng
              </small>
              <br />
              <small>
                Doanh số{" "}
                <strong>
                  <FormatMoney money={countTotalWeekOption} />
                </strong>
              </small>
            </>
          )}
          {countWeekOption && <Bar data={dataWeekOption} options={options} />}
        </Card>
        <Card title="Thống kê theo năm">
          <DatePicker onChange={handleOnchangeYear} picker="year" />
          {countOrderYear?.total && (
            <>
              <small style={{ marginLeft: "15px" }}>
                Có tổng cộng <strong>{countOrderYear?.total}</strong> đơn hàng
              </small>
              <br />
              <small>
                Doanh số{" "}
                <strong>
                  <FormatMoney money={countTotalYear} />
                </strong>
              </small>
            </>
          )}
          {countYearOption && <Bar data={dataYearOption} options={options} />}
        </Card>
      </div>
    </div>
  );
};
export default MangerStatistical;
