import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import ProductService from "../models/Product.service";
import { ProductCollection } from "../libs/enums/product.enum";

const productService = new ProductService();

const productController: T = {};

// SPA =============================================================

// getProducts =================================================
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const { page, limit, order, productCollection, search } = req.query;
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (productCollection)
      inquiry.productCollection = productCollection as ProductCollection;
    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProducts:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// getProduct =================================================

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params;

    console.log("req.member:", req.member);

    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// SSR =============================================================

// getAllProducts =================================================

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts"); //eslint-disable-line no-console
    const data = await productService.getAllProducts();
    console.log("data", data); // eslint-disable-next-line no-console
    res.render("products", { products: data });
  } catch (err) {
    //catch any error that may occur during the execution of the function
    console.log("Error :getAllProducts ", err);
    //  print out the error message if any error occurs when processing sign up request
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard.message);
  }
};

// createNewProduct =================================================

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct \n");
    console.log("req.body:", req.body);
    console.log("\n req.files:\n", req.files);
    // res.send("\nCreate new product success!\n");
    if (!req.files?.length)
      // bu yerda files ning lengthi kamida o dan katta bo`lishi kk, ya`ni kamida bitta file yuklagan bo`lishi kk, agar length 0 ga teng bo`lsa unda error beradi
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      // console.log("req.files?.map : \n", req.files?.map);
      // console.log("ele: \n", ele);
      // console.log("ele.filename: \n ", ele.filename);
      // console.log("\n data.productImages :>> \n ", data.productImages);
      // console.log(`\n ele.path : ${ele.path} \n`);
      return ele.path.replace(/\\/g, "/");
    });
    // console.log(" data :>> \n", data);
    await productService.createNewProduct(data);
    res.send(
      `<script>alert("Successful  creation!"); window.location.replace("/admin/product/all");</script>`
    );

    // TODO: TOKENS AUTHENTICATION 생성하여 보내 주기
  } catch (err) {
    //catch any error that may occur during the execution of the function
    console.log("Error :createNewProduct ", err); //  print out the error message if any error occurs when processing sign up request
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace("/admin/product/all")</script>`
    );
  }
};

//  updateChosenProduct =========================================================

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct"); //
    const id = req.params.id;
    console.log("req.params: ", req.params);
    console.log("id :>> ", id);

    const result = await productService.updateChosenProduct(id, req.body);

    // res.send(result);
    res.status(HttpCode.OK).json({ data: result });
    // TODO: TOKENS AUTHENTICATION 생성하여 보내   주기
  } catch (err) {
    //catch any error that may occur during the execution of the function
    console.log("Error :updateChosenProduct ", err); //  print out the error message if any error occurs when processing sign up request
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard.message);
  }
};

export default productController;
