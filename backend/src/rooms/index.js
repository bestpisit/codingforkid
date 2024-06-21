const express = require('express');
const fs = require('fs');
const path = require('path');

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
    res.json()
})

router.get('/:roomid', async (req, res) => {
    const {roomid} = req.params;
    const chats = await prisma.room.findFirst(
        {
            where: {
                name: roomid
            },
            select: {
                messages: {
                    select:{
                        author: {
                            select:{
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
    res.json(chats.messages);
});

router.post('/:roomid', async (req, res) => {
    const {roomid} = req.params;
    const { message, username } = req.body;
    try {
        await prisma.user.upsert({
            where:{
                name: username
            },
            update:{},
            create:{
                name: username
            }
        }).then(async user=>{
            res.json(await prisma.message.create({
                data:{
                    message: message,
                    author_id: user.id,
                    room_id: roomid
                }
            }));
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:roomid/:msgid', async (req, res) => {
    const {roomid,msgid} = parseInt(req.params.id);
    try {
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