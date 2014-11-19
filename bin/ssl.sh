#!/bin/bash

# TODO. use a CA (certificate authority)

key="devkey.pem"
certrequest="devcertrequest.csr"
cert="devcert.pem"

openssl genrsa -out $key 2048
openssl req -new -key $key -out $certrequest # lots of questions here
openssl x509 -req -in $certrequest -signkey $key -out $cert
