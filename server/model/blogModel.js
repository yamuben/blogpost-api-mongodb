import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({

    title:  {
        type: String,
        required: [true, "title is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required: [true, "User is required"]
    },
    timeStamp: {
        type: String
    },
});

blogSchema.pre(/^find/,function(next){
    this.populate({
        path:"userId",
        select:"firstName email"
    })

    next();
});

const blogInfos = mongoose.model("blogpost",blogSchema);

export default blogInfos;
