import { getPostbyId, updatePostStatus } from "../../model/Post/index.js";
import { getUser } from "../../model/User/index.js"

export const getAllUser = async (req, res) => {
  try {
    const users = await getUser()
    res.status(200).json({
      responseCode: 200,
      message: "success",
      data: users, 
    });
  } catch (error) {
    res.status(500).json({
      responseCode: 500,
      message: "Network error",
      data: error.message, 
    });
  }
}

export const approvePost = async (req, res) => {
  const { id } = req.body
  try {
    const getPost = await getPostbyId(id)
    if(getPost.responseCode == 200) {
      const updatePost = await updatePostStatus(getPost.data.id, getPost.data.published)
      if(updatePost.responseCode == 200 ) {
        res.status(200).json({
          responseCode: 200,
          message: "Update Success",
          data: updatePost.data, 
        });
      }
    } else {
      res.status(404).json({
        responseCode: 404,
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      responseCode: 200,
      message: "Network error",
      data: error.message, 
    });
  }
}