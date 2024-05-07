import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput, LoginInput, Member } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors from "../libs/Error";

const memberService = new MemberService();

const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup"); //
    console.log("req.body: ", req.body); //  for test
    const input: MemberInput = req.body, // get the data from client side to server side by using 'body-parser' middleware
      result: Member = await memberService.signup(input);
    res.json({ member: result });
  } catch (err) {
    //catch any error that may occur during the execution of the function
    console.log("Error :Signup ", err); //  print out the error message if any error occurs when processing sign up request
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard.message);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    console.log("BODY:", req.body); //JSON data you sent to server
    const input: LoginInput = req.body, //get data from client side
      result = await memberService.login(input); //call service class function
    res.json({ member: result }); //send back the response to client side
  } catch (err) {
    console.log("Error : login ", err); //print error message on console
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard.message);
  }
};
export default memberController;
