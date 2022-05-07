import React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import apis from "../../../api";
import { Irespone } from "../../../constants/interface";
import "./style.scss";

const FilterProduct = () => {
  const history = useHistory();
  const keySearch = "?loai-tranh=";
  const type = history?.location?.search?.replace(keySearch, "");
  const [data, setData] = useState("");

  React.useEffect(() => {
    if (type) {
      apis.FilterProduct(type).then(({ data }: { data: Irespone }) => {
        setData(data?.data);
      });
    }
  }, [type]);

  return (
    <div className="container px-0">
      <div className="row mt-5">
        {data?.length > 0 && Array.isArray(data) ? (
          data?.map((item: any, index: number) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-card"
              key={`card_${item._id}`}
            >
              <div>
                <Link to={`/product/${item._id}`}>
                  <img width="100%" src={item.image} />
                </Link>
                {item.percent_sale ? (
                  <span className="product-card_percent">
                    Giảm {item.percent_sale}%
                  </span>
                ) : null}
                <p className="product-card_title">{item.title}</p>
                <p>
                  <span className="product-card_price-sale">
                    {item.price_sale && `${item.price_sale}đ`}
                  </span>{" "}
                  <span
                    className={
                      item.price_sale
                        ? "product-card_price"
                        : "product-card_price-bold"
                    }
                  >
                    {item.price && item.price}đ
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>Không có sản phẩm nào</div>
        )}
      </div>
    </div>
  );
};
export default FilterProduct;
