import * as jwt from 'jsonwebtoken';
import { User } from 'src/models/user.model';

export const VerifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) throw new Error(`Invalid Authentication.`);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) throw new Error(`Invalid Authentication.`);
            req.id = decode.id
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}})

        if(user.roleId !== 1) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
