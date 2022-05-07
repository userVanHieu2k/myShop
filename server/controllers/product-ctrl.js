const { toNumber } = require("lodash");
const Product = require("../models/product-model");

CreateProduct = (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ status: "ERROR", message: "Filed is not null" });
  }
  let product = null;
  if (req.body.price_sale) {
    product = new Product({
      ...body,
      percent_sale: Math.ceil((1 - req.body.price_sale / req.body.price) * 100),
    });
  } else product = new Product({ ...body, percent_sale: null });


  console.log(product, "product");
  product
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ status: "SUCCESS", message: "Create product success" });
    })
    .catch((error) => {
      return res.status(400).json({ status: "ERROR", message: error });
    });
};

GetProduct = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error get product", status: "ERROR", error: err });
    }
    if (product.length < 1) {
      return res
        .status(400)
        .json({ message: "Product not found", status: "ERROR" });
    }
    return res.status(200).json({ status: "SUCCESS", data: product });
  });
};

GetProductDetail = (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(400).json({ message: err, status: "ERROR" });
    }
    if (product.length < 1) {
      return res
        .status(400)
        .json({ message: "Product not found", status: "ERROR" });
    }
    return res.status(200).json({ status: "SUCCESS", data: product });
  });
};

GetProductPage = (req, res) => {
  const perPage = 20;
  const page = req.params.page || 1;
  Product.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ status: "ERROR", message: err });
      }
      if (product) {
        Product.countDocuments((err, count) => {
          if (err) {
            return res.status(400).json({ status: "ERROR", message: err });
          }
          if (!count) {
            return res.status(400).json({ status: "ERROR", message: err });
          }
          return res
            .status(200)
            .json({
              status: "SUCCESS",
              total: count,
              indexPage: 20,
              page: page,
              product,
            });
        });
      }
    });
};

EditProduct = (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  Product.findOne({ _id: id }, (err, product) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (product.length < 1) {
      return res
        .status(201)
        .json({
          status: "ERROR",
          message: "Not product id request",
          errorCode: "ERROR.NOT.EXIST",
        });
    }
    product.description = req.body.description;
    product.title = req.body.title;
    product.price = req.body.price;
    product.price_sale = req.body.price_sale;
    product.number_product = req.body.number_product;
    product.percent_sale = Math.ceil(
      (1 - req.body.price_sale / req.body.price) * 100
    );
    product.image = req.body.image;
    product.color = req.body.color;
    product.size = req.body.size;
    product
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Edit success" });
      })
      .catch((err) => {
        return res.status(400).json({ status: "ERROR", message: err });
      });
  });
};



DeleteProduct = (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id }, (err, product) => {
    if (err) {
      return res.status(400).json({ status: "ERROR", message: err });
    }
    if (product.length < 1) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Product not found" });
    }
    product
      .delete()
      .then(() => {
        return res
          .status(200)
          .json({ status: "SUCCESS", message: "Delete success" });
      })
      .catch((err) => {
        return res.status(201).json({ status: "ERROR", message: err });
      });
  });
};

SearchProduct = (req, res) => {
  const result = [];
  Product.find({}, (err, product) => {
    if (err) {
      return res.status(401).json({ status: "ERROR", message: err });
    }
    if (product.length < 1) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Product not found" });
    }
    product.forEach((el) => {
      if (
        el.title.toLowerCase().includes(req.params.search.toLowerCase()) ===
        true
      ) {
        result.push(el);
      }
    });
    if (result.length > 0) {
      return res
        .status(200)
        .json({ status: "SUCCESS", message: "Search Success", result });
    }
    if (!result.length)
      res
        .status(200)
        .json({
          status: "ERROR",
          message: "No result search",
          errorCode: "ERROR.SEARCH.NOT.FOUND",
          result: [],
        });
  });
};

FilterProduct = (req, res) => {
  const type = req.params.type;
  console.log(type)
  Product.find({ shoe_type: type }, (err, product) => {
    console.log(product)
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err });
    }
    if (!product || product.length < 1) {
      return res.status(200).json({ status: 'SUCCESS', message: 'Not product in filter', data: [] });
    }
    return res.status(200).json({ status: 'SUCCESS', message: 'Success', data: product });
  })
}

FilterProductWithPrice = async (req, res) => {
  const typePrice = req.params.type;
  await Product.find({}, (err, result) => {
    if (!result || result.length < 1) {
      return res.status(200).json({ status: 'ERROR', message: 'Result not found', data: [] })
    }
    let resultFilter = [];
    if (Number(typePrice) === 1) {

      resultFilter = result.filter(item => item.price_sale < 3000000)
    }
    if (Number(typePrice) === 2) {
      resultFilter = result.filter(item => item.price_sale > 2999999 && item.price_sale < 5000000)
    }
    if (Number(typePrice) === 3) {
      resultFilter = result.filter(item => item.price_sale > 4999999 && item.price_sale < 10000000)
    }
    if (Number(typePrice) === 4) {
      resultFilter = result.filter(item => item.price_sale > 10000000)
    }
    return res.status(200).json({ status: 'SUCCESS', message: 'Success', data: resultFilter });
  })
}

ApartFromNumberProduct = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ status: 'ERROR', message: 'Body is not null' });
  }
  Product.findOne({ _id: body.productId }, (err, result) => {
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err })
    }
    if (!result || result?.length) {
      return res.status(200).json({ status: 'ERROR', message: 'Not product with Id request' });
    }
    result.number_product = body.number_product;
    result
      .save()
      .then(() => {
        return res.status(200).json({ status: 'SUCCESS', message: 'success', data: result });
      })
      .catch((err) => {
        return res.status(400).json({ status: 'ERROR', message: err });
      })
  })
}

AddNumberProduct = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ status: 'ERROR', message: 'Body request not found' });
  }

  Product.findOne({ _id: body.productId }, (err, result) => {
    if (err) {
      return res.status(400).json({ status: 'ERROR', message: err });
    }
    if (!result || result.length < 1) {
      return res.status(200).json({ status: 'SUCCESS', message: 'Not product with productId', data: '' });
    }
    console.log(result)
    const newResult = JSON.stringify(result.number_product);
    const newResults = JSON.parse(newResult);
    const key = body.color;
    const updateNumber = { ...newResults, [key]: Number(newResults[key]) + Number(body.total) }
    result.number_product = updateNumber;
    console.log(updateNumber)
    result
      .save()
      .then(() => {
        return res.status(200).json({ status: 'SUCCESS', message: 'Success' });
      })
      .catch((err) => {
        return res.status(400).json({ status: 'ERROR', message: err });
      })
  })
}


module.exports = {
  CreateProduct,
  GetProduct,
  EditProduct,
  DeleteProduct,
  SearchProduct,
  GetProductPage,
  GetProductDetail,
  FilterProduct,
  FilterProductWithPrice,
  ApartFromNumberProduct,
  AddNumberProduct
};
