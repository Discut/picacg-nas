//导入express
const express = require('express');
const controler = require("./src/controller/controllerManagement");
//创建web服务器
const app = express();

// 解析 url-encoded格式的表单数据
app.use(express.urlencoded({ extended: false }));
 
// 解析json格式的表单数据
app.use(express.json());
// controller注册
controler.register(app);

// 通过ap.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
app.listen(9898, () => {
    console.log('服务器启动成功');
})