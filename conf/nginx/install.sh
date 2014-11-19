#!/bin/bash

# TODO. cp ssl conf into /etc/nginx/conf.d/
sudo cp conf/nginx/sites-enabled/default /etc/nginx/sites-enabled/
sudo service nginx restart
