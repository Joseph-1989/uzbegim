import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const memberService = new MemberService(); //create an instance of service class

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error: Go Home", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.error("Error : Get SignUp", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.error("Error : Get Login", err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup: this is restaurant.controller module!"); //
    console.log("the body information contains in postman app: ", req.body); //  for test
    const newMember = req.body; // get the data from client side to server side by using 'body-parser' middleware
    newMember.memberType = MemberType.RESTAURANT; //set the default member type to be "Restaurant"
    const result = await memberService.processSignup(newMember);

    // TODO: SESSIONS ATHENTICATION - save user info into session object and send it back to client side

    res.send(result);
  } catch (err) {
    //    catch any error that may occur during the execution of the function
    console.error("Error : processSignup ", err); //  print out the error message if any error occurs when processing sign up request
    res.send(err); //return error message back to client side if any error occurs during sign up process
  }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("ProcessLogin: ", req.body); //  JSON data you sent to server
    const input: LoginInput = req.body; //   get data from client side
    const result = await memberService.processLogin(input); //    call service class function
    // TODO: SESSIONS ATHENTICATION
    res.send(result); // send back the response to client side
  } catch (err) {
    console.error("Error : processLogin ", err); //  print error message on console
    res.send(err); // send back a response with status code and error message
  }
};

export default restaurantController;
