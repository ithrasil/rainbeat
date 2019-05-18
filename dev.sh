#!/bin/sh
cd frontend
npm start & cd ../backend/public && php -S localhost:8000

