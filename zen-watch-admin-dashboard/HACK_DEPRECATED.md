# Instal NGINX - NOT USED ANYMORE
```
apt install nginx
cd /etc/nginx/sites-available/
vim default

Comment out like this: 
# root /var/www/html;

Update the location block like this (comment out try_files, add proxy_pass with the right port)
# try_files $uri $uri/ =404;
proxy_pass http://localhost:1337;

NOTE: We are doubling down admin-api-server for both backend api & frontend, tied to different load balancers.
So, we just point the port 1338 to accept traffic from the admin-api-server load balancer, and set firewall accordingly.

Close the default file, restart nginx service
sudo service nginx restart
sudo service nginx stop
```

# Allowed origins is deprecated in admin server
https://github.com/sgdheeban/zen-watch-backend/commit/a642346b4550656b3a5c3ad43ce844d9f5d10aa8
