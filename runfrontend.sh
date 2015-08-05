#!/bin/bash

if [ -f lastpid ]
then
    kill -9 $(cat lastpid)
fi

node utils/marvinproxy.js >> /opt/serleena-frontend/log 2>&1 &
echo $! > lastpid
