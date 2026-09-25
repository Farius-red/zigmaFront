FROM nginx:1.27-alpine

RUN apk add --no-cache curl \
    && addgroup -g 1001 -S angular \
    && adduser -S angular -u 1001 -G angular

COPY www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R angular:angular /usr/share/nginx/html \
    && chown -R angular:angular /var/cache/nginx \
    && chown -R angular:angular /var/log/nginx \
    && chown -R angular:angular /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R angular:angular /var/run/nginx.pid

USER angular

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

