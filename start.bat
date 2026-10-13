@echo off
title TransitIQ - Public Transit Intelligence
echo Starting TransitIQ Full-Stack Platform...
start "" http://localhost:5000
node server/index.js
pause
