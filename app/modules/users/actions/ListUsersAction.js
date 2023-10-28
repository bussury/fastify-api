import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import { UserDao } from "./../../../Models/UserDao.js";

export default class ListUsersAction extends BaseAction {
  static get accessTag() {
    return "users:list";
  }
  static async run(ctx) {
    const { query } = ctx;
    const users = await UserDao.all({ ...query });
    return this.result({
      data: users.results,
      headers: { "X-Total-Count": users.total },
    });
  }
}
