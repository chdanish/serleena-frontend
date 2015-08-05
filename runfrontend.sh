#!/bin/bash

if [ -f lastpid ]
then
    kill -9 $(cat lastpid)
fi

node /opt/serleena-frontend/www/utils/marvinproxy.js >> /opt/serleena-frontend/marvinproxy.log 2>&1 &
echo $! > lastpid
