const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    let accessToken = req.headers?.authorization?.split('Bearer ')[1];
    const jwtToken = accessToken;
    if(!jwtToken) return res.status(500).json({ error: "Invalid Authentication" });

    try {
        if (jwtToken) {
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || 'secret');
            if (!decoded) {
                throw new Error('User not found');
            }

            req.user = decoded;

            return next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
};

exports.authenticateToken = authenticateToken;