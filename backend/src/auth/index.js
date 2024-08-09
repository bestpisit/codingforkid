const express = require('express');
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await prisma.user.findFirst({
            where: {
                name: username
            }
        });

        // If user does not exist, return an error
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, return an error
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // If the password matches, generate a JWT token
        const token = jwt.sign(user, process.env.JWT_SECRET || 'secret');

        return res.json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        let user = await prisma.user.findFirst({
            where: {
                name: username
            }
        });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!username || !password) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.user.create({
            data: {
                name: username,
                password: hashedPassword
            }
        });
        return res.json(user);
    }
    catch(e){
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;