FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY tastyplan.de.cer /etc/ssl/certs/tastyplan.de.cer
COPY tastyplan.de.key /etc/ssl/private/tastyplan.de.key
COPY ssl-bundled.cer /etc/ssl/certs/ssl-bundled.cer

EXPOSE 80
EXPOSE 443