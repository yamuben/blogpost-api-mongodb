import commentInfos from "../model/commentModel";
import blogInfos from "../model/blogModel";

class commentController {

    static createComment = async (req, res) => {
        let { content } = req.body;
        let blogIdFromParams = req.params.id;

        const newComment = await commentInfos.create(req.body);

        // console.log(newComment)

        const blog = await blogInfos.findByIdAndUpdate(
            blogIdFromParams,
            {
                $push: {
                    commentsId: newComment._id
                }
            })

            if(!blog){
                return res.status(404).json({
                    status:404,
                    error:"failed to create comment"
                })
            }

        return res.status(200).json({
            status: 200,
            message: "comment created successfully",
            data: blog
        })



    }

}

export default commentController;