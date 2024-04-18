#!/bin/sh

docker container rm --force book_renter-db-1
docker volume rm --force book_renter_database
