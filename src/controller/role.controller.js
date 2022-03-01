const roleService = require('../service/role.service')

class RoleController {

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const { result, count } = await roleService.getRoleList(offset, size);
    // console.log(count, '222')
    ctx.body = {
      code: 200,
      data: result,
      totalCount: count[0].total
    };
    // const result = await roleService.getRoleList(offset, size);
    // ctx.body = {
    //   code: 200,
    //   data: result
    // };
  }

  async create(ctx, next) {
    // 获取用户请求传递的参数
    const role = ctx.request.body;

    // 查询数据库 -> 抽离到service
    const result = await roleService.create(role);

    // 返回结果
    ctx.body = result;
  }

  async update(ctx, next) {
    const { roleId } = ctx.params;
    const { roleName, userName } = ctx.request.body;
    // console.log(roleId, roleName, userName);

    const result = await roleService.update(roleName, userName, roleId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { roleId } = ctx.params;

    // 2.删除内容
    const result = await roleService.remove(roleId);
    // console.log(result, '44')

    ctx.body = {
      code: 200,
      data: result
    };
  }
}

module.exports = new RoleController();
