const service = require('../service/label.service');

// 判断标签是否存在
const verifyLabelExists = async (ctx, next) => {
  // 1.取出要添加的所有标签
  const { labels } = ctx.request.body;
  // 2.判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    
    const label = { name };
    if (!labelResult) {
      // 创建标签数据
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }

  ctx.labels = newLabels;

  await next();
}

module.exports = {
  verifyLabelExists
}
