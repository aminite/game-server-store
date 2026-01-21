import mongoose from "mongoose";

const Schema = mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Subscription", Schema)