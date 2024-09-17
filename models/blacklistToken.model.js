import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String
    }
})

const blacklistedTokenModel = mongoose.model("blacklistedtokens", blacklistSchema);

export default blacklistedTokenModel