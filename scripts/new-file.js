const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const changeCase = require('change-case'); // 字符串格式切换

const fileNameReg = /^[a-z]+(-[a-z]+)*$/;
async function getFileName() {
  let fileName = process.argv[2]; // 获取命令行输入的参数

  if (!fileName) {
    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'fileName',
      message: chalk.green('请输入要创建的文件名称(小写字母连字符的形式，如test-abc): ')
    }]);
    if (answers.fileName) {
      fileName = answers.fileName;
    } else {
      fileName = await getFileName();
    }
  }

  if (!fileNameReg.test(fileName)) {
    fileName = await getFileName();
  }

  return fileName;
}

getFileName().then(fileName => {
  const pascalFileName = changeCase.pascalCase(fileName); // 开头字母转大写

  console.log(pascalFileName);

  // 在src/controller目录下创建一个子目录，用于存放file的核心代码
  const controllerFile = path.resolve(__dirname, `../src/controller/${fileName}.js`);
  // const docFile = path.resolve(__dirname, `../src/router/${fileName}.js`);
  const exists = fs.existsSync(controllerFile);

  if (exists) {
    console.log(`${chalk.red(`文件 ${chalk.bold(fileName)} 代码或文档已存在，请勿重复添加！`)}`);
    return;
  } else {
    fs.mkdirSync(controllerFile); // 创建文件夹
  }
})
