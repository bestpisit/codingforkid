const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const roomRouter = require('./src/rooms');
const mockupRouter = require('./mockup');
const authRouter = require('./src/auth');
const authMiddleware = require('./src/middleware/auth_middleware');

app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});

app.use('/auth', authRouter);

app.use(authMiddleware.authenticateToken);

app.get('/auth/me', (req, res) => {
    res.json(req.user);
});

app.use('/rooms',roomRouter);

app.use('/mockup', mockupRouter);


app.listen(port, () => {
    console.log(`Coding For Kids Server is opening on port ${port}`);
})

module.exports = prisma;