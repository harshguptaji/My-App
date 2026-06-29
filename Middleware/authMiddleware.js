import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;


    if(!token){
        return res.status(401).json({
            success: false,
            message: "Please login to access this resource"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please login again"
        });
    }
}