import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
        const authHeader = req.headers['authorization']; // Gunakan 'authorization' (huruf kecil)
    if (!authHeader) {
        return res.status(401).json({ msg: "Tidak ada token yang diberikan" });
    }

    //kita validasi apakah si token benar" ada dan dapat di ekstrak dari header authorization
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: "Token tidak valid" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.email = decoded.email;
        next();
    } catch (error) {
        return res.status(403).json({msg: "token sudah kadaluarsa"});
    }
} 