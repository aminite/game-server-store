import asyncHandler from "express-async-handler";

const linkUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.account) {
        res.status(400);
        throw new Error("Please fill all fields");
    }
    if (req.user.account) {
        res.status(400);
        throw new Error(`This User is already linked to ${req.user.account}`);
    } else {
        await req.user.updateOne({account: req.body.account})
        res.status(200).json({ message: "success" });
    }
});

export {linkUser};