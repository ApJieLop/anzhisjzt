FROM nginx:1.18-alpine
LABEL maintainer="dayu@sunreal.cn"

COPY dist/ /usr/share/nginx/html/