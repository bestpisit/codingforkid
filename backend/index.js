const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const roomRouter = require('./src/rooms');

app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});

app.get('/users', async (req, res) => {
    res.json(await prisma.user.findMany());
});

app.use((req, res, next) => {
    req.prisma = prisma;
    next();
})
app.use('/rooms',roomRouter);

app.listen(port, () => {
    console.log(`Coding For Kids Server is opening on port ${port}`);
})

module.exports = prisma;