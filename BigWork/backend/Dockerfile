# 使用 Node 官方镜像作为基础镜像
FROM node:16-alpine as build-stage

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm ci --only=production
# RUN npm install

# 复制所有源代码到工作目录
COPY . .

# 应用的端口号
EXPOSE 3000

# 定义环境变量
ENV NODE_ENV production

# 运行应用
CMD [ "node", "app.js" ]
