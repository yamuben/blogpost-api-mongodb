import blogData from "../model/blogModel";
import axios from "axios";
import Response from "../helpers/response";

class BlogController {

    static getAllBlogsFromAPI = async (req, res) => {

        try {
            const responseFromAPI = await axios.get('https://blogpost-api-shecancode.herokuapp.com/api/v1/blog/dash/all');

            // console.log(responseFromAPI)
            return Response.successMessage(res,"fetched succesfully",responseFromAPI.data,200)
        } catch (e) {
            console.log(e)
            return Response.errorMessage(res,"failed to fetch", 403)
        }

    }

    static updateOneBlog = async (req, res) => {
        const blogId = req.params.id;
        let {
            title,
            content,

        } = req.body;

        const blog = await blogData.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: "blog not found"
            })
        }

        await blogData.findByIdAndUpdate(blogId, req.body);

        const data = await blogData.findById(blogId);

        return res.status(200).json({
            status: 200,
            message: "blog updated succesfully",
            data
        })



    }

    static deleteOneBlog = async (req, res) => {
        const blogId = req.params.id;

        await blogData.findByIdAndDelete(blogId)
        const data = await blogData.findById(blogId)

        if (!data) {
            return res.status(200).json({
                status: 200,
                message: "blog  deleted Succefully",
            })
        }


        return res.status(201).json({
            status: 201,
            message: "blog  failed to delete",
            data
        })
    }

    static getAllBlogs = async (req, res) => {
        const data = await blogData.find();
        // console.log(data)
        return res.status(200).json({
            status: 200,
            message: "this is all blogs",
            data
        });
    }

    static getOneBlog = async (req, res) => {

        const blogId = req.params.id;

        const data = await blogData.findById(blogId)

        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "blog  failed to be registered",
            })
        }

        return res.status(201).json({
            status: 201,
            message: "blog  created succesfully",
            data
        })
    }

    static createBlog = async (req, res) => {

        const timeStamp = new Date(Date.now());
        let {
            title,
            content,

        } = req.body;

        req.body.timeStamp = timeStamp;


        const data = await blogData.create(req.body)

        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "blog  failed to be registered",
            })
        }
        console.log("create: ", data)

        return res.status(201).json({
            status: 201,
            message: "blog  created succesfully",
            data: data._doc
        })


    }
}

export default BlogController;
