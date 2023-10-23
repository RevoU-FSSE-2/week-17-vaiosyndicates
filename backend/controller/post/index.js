import { createPost, deletePost, getAllPost } from "../../model/Post/index.js";


export const getPosts = async (req, res) => {
  const data = await getAllPost()

  res.status(200).json({
    responseCode: 200,
    message: "success",
    data: data, 
  });
}

export const createPosts = async (req, res) => {
  const { title, authorId } = req.body

  try {
    const data = await createPost(title, authorId)
    if(data.responseCode == 200) {
      res.status(200).json({
        responseCode: 200,
        message: "success",
        data: data, 
      });
    } else {
      res.status(404).json({
        responseCode: 404,
        message: "Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      responseCode: 500,
      message: "failed",
      data: error.message, 
    });
  }
}

export const deletePosts = async (req, res) => {
  const { id, authorId } = req.body
  // console.log(req.body)
  try {
    const data = await deletePost(id, authorId)
    if(data.responseCode == 200) {
      res.status(200).json({
        responseCode: 200,
        message: "success",
      });
    } else {
      res.status(404).json({
        responseCode: 404,
        message: "Can't delete other user post",
      });
    }
  } catch (error) {
    res.status(500).json({
      responseCode: 500,
      message: "failed",
      data: error.message, 
    });
  }
}