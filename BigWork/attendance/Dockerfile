# 第一阶段：构建阶段，使用 Node.js 镜像构建 Vue 应用
FROM node:16-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制 Vue 项目的所有文件到工作目录
COPY . .

# 构建 Vue 项目
RUN npm run build

# 第二阶段：运行阶段，使用 Nginx 镜像来部署构建好的 Vue 应用
FROM nginx:stable-alpine as production-stage

# 将构建阶段的 /app/dist 目录中的内容复制到 Nginx 的静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制新的 Nginx 配置文件到容器
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口供外部访问
EXPOSE 80

# 启动 Nginx，并且设置以前台方式运行
CMD ["nginx", "-g", "daemon off;"]
