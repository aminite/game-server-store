import asyncHandler from "express-async-handler";

export default asyncHandler(async (req, res, next) => {
    const clientIP = (req.ip || req.connection.remoteAddress).replace('::ffff:', '').replace('::ffff:', '');
    console.log(process.env.MTA_SERVER);
    if (clientIP === process.env.MTA_SERVER) {
        next();
    } else {
        res.status(401)
        throw new Error("Not authorizeddd");
    }
})