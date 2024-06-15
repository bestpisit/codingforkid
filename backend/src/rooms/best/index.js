const express = require('express');
const router = express.Router();
const prisma = require('../../prismaClient');

let roomConfiguration = {
    name: 'Best',
    id: null
};

const initRoom = async () => {
    await prisma.room.findFirst({
        where: {
            name: roomConfiguration.name
        }
    }).then(async room => {
        if (room === null) {
            await prisma.room.create({
                data: {
                    name: roomConfiguration.name
                }
            })
        }
        roomConfiguration = { ...room };
    });
};

initRoom();

router.get('/', (req, res) => {
    res.json(roomConfiguration);
});

router.get('/chats', async (req, res) => {
    const chats = await prisma.room.findFirst(
        {
            where: {
                name: roomConfiguration.name
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

router.post('/chat', async (req, res) => {
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
                    room_id: roomConfiguration?.id
                }
            }));
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

router.delete('/chat/:id', async (req, res) => {
    const messageId = parseInt(req.params.id);
    try {
        const deletedMessage = await prisma.message.delete({
            where: {
                id: messageId
            }
        });
        res.json(deletedMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;