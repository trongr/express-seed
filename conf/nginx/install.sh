#!/bin/bash

sudo cp conf/nginx/sites-enabled/default /etc/nginx/sites-enabled/
sudo cp conf/nginx/conf.d/{devcert.pem,devkey.pem} /etc/nginx/conf.d/
sudo service nginx restart
