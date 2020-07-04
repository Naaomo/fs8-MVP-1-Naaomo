const { sign } = require('jsonwebtoken');


const createAccessToken = userID => {
    return sign(
        {userID},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
        );
}

const createRefreshToken = userID => {
    return sign(
        {userID},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );
}

module.export = {createAccessToken, createRefreshToken}