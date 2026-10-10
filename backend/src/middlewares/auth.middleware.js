import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized: Access token required");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized: Invalid token format");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Access token has expired");
        }

        throw new ApiError(401, "Invalid access token");
    }
    if (!decodedToken.userId) {
        throw new ApiError(401, "Invalid access token payload");
    }

    req.user = {
        userId: decodedToken.userId
    };
    next();
});

export {verifyJWT};