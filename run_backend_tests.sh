#!/bin/sh
./clear_storage.sh &&
cd backend
bin/phpunit tests &&
cd .. &&
./clear_storage.sh

