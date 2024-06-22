const express = require('express');
const fs = require('fs');
const path = require('path');
const prisma = require('../prismaClient');

const router = express.Router();

const roomsDir = path.join(__dirname);

router.post('/create', async (req, res) => {
    const { name } = req.body;
    let room = await prisma.room.findFirst({
        where: {
            name: name
        }
    }).then(async room => {
        if (room === null) {
            await prisma.room.create({
                data: {
                    name: name
                }
            })
        }
    });
    res.json(room);
});

router.get('/:roomid', async (req, res) => {
    const { roomid } = req.params;
    const chats = await prisma.room.findFirst(
        {
            where: {
                name: roomid
            },
            select: {
                messages: {
                    select: {
                        author: {
                            select: {
                                name: true
                            }
                        },
                        message: true,
                        timeStamp: true,
                        id: true
                    }
                }
            }
        }
    )
    if (chats) {
        res.json(chats.messages);
    }
    else {
        res.json({ error: "Don't have room" })
    }
});

router.post('/:roomid', async (req, res) => {
    const { roomid } = req.params;
    const { message, username } = req.body;

    if(!username) return res.status(400).json({error: "Invalid Username"});

    try {
        // Find the room by name to get its ID
        const room = await prisma.room.findFirst({
            where: { name: roomid },
            select: { id: true }
        });

        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Upsert the user (create if doesn't exist)
        const user = await prisma.user.upsert({
            where: {
                name: username
            },
            update: {},
            create: {
                name: username
            }
        });

        // Create the message
        const newMessage = await prisma.message.create({
            data: {
                message: message,
                author_id: user.id,
                room_id: room.id
            }
        });

        res.json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:roomid/:msgid', async (req, res) => {
    const { roomid, msgid } = req.params;
    try {
        const message = await prisma.message.findFirst(
            {
                where: {
                    id: {equals: parseInt(msgid)}
                },
                select: {
                    room_id: true
                }
            }
        );
        const aRoom = await prisma.room.findFirst({
            where: {
                name: roomid
            },
            select: {
                id: true
            }
        });
        if (aRoom?.id != message.room_id) return res.status(500).json({ error: "Invalid room ID" });
        const deletedMessage = await prisma.message.delete({
            where: {
                id: parseInt(msgid)
            }
        });
        res.json(deletedMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// fs.readdirSync(roomsDir).forEach((folder) => {
//     const folderPath = path.join(roomsDir, folder);
//     if (fs.statSync(folderPath).isDirectory()) {
//         const roomRouter = require(path.join(folderPath, 'index.js'));
//         router.use(`/${folder}`, roomRouter);
//     }
// });

module.exports = router;