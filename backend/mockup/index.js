const express = require('express');

const router = express.Router();

const mockData = [
    {
        username: "Thamanit",
        message: "Good morning"
    },
    {
        username: "Pap",
        message: "Good morning, Too"
    },
    {
        username: "Gun",
        message: "What subject do we have today?"
    },
    {
        username: "Mana",
        message: "It's CodingForKids"
    }
]

router.get('/', (req, res) => {
    res.json(mockData);
});

module.exports = router;