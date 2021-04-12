import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "please provide content of the comment "]
    },
    timeStamp: {
        type: Date,
        default: new Date(Date.now())
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: [true, "please provide userId"]
    }
});


commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "userId",
        select: "firstName email"
    })
    next();
});


const commentInfos = mongoose.model("comment", commentSchema);

export default commentInfos;
