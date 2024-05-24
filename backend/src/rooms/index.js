const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const roomsDir = path.join(__dirname);

fs.readdirSync(roomsDir).forEach((folder) => {
    const folderPath = path.join(roomsDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
        const roomRouter = require(path.join(folderPath, 'index.js'));
        router.use(`/${folder}`, roomRouter);
    }
});

module.exports = router;