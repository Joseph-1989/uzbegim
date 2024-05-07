import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import { MemberInput } from "../libs/types/member";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};
restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page");
  } catch (err) {
    console.log("Error, getSignup:", err);
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    res.send("processLogin Page: DONE");
  } catch (err) {
    console.error("Error : processLogin ", err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup: this is restaurant.controller module!");
    console.log("the body information contains in postman app: ", req.body);

    const newMember = req.body; // get the data from client side to server side by using 'body-parser' middleware
    newMember.memberType = MemberType.RESTAURANT; //set the default member type to be "Restaurant"

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);
    res.send(result);
  } catch (err) {
    console.error("Error : processSignup ", err);
    res.send(err);
  }
};

export default restaurantController;
