import Errors, { HttpCode, Message } from "../libs/Error";
import { MemberType } from "../libs/enums/member.enum";

import { Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec(); // bu .exec(); methodini qo`ymasa ham, undan oldin ishlatilayotgan mongoose dagi method ishlayveradi.
    // buning vasifasi, undan oldingi methodga qo`shimcha holatda boshqa methodlar qo`shilib kelmasligini bildiradi.
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    console.log("exist:", exist);
    try {
      const result = await this.memberModel.create(input);
      // const tempResult = new this.memberModel(input);
      // const result = await tempResult.save();
      console.log("This info is located in Member.service module!");
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default MemberService;
