import mongoose from "mongoose";

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, account: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model("User", Schema);