#!/bin/bash

echo "Waiting for postgres to get up and running..."
while ! nc -z db 5432; do
  echo "waiting for postgress listening..."
  sleep 0.1
done

echo "PostgreSQL started"

npx sequelize-cli db:migrate

echo "Starting application..."

cd src

node index.js
