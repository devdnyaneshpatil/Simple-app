const userContext=require("../db/context/user.context");
const CustomError = require("../utils/customError");

const getAllUsersController = async (req, res, next) => {
  const { page = 1, limit = 0 } = req.query;
  try {
    const users = await userContext.getAllUsers(page,limit);
    return res.status(200).json({data:users});
  } catch (error) {
    return next(error);
  }
};

const getOneUserController = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userContext.getUserByUserId(userId)
        if (!user) {
            const err = new CustomError(`User not found with give Id:-${userId}`, 404)
            return next(err)
        }
        return res.status(200).json({data:user})
    } catch (error) {
        return next(error)
    }
}

const updateUserController = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userContext.getUserByUserId(userId)
        if (!user) {
            const err = new CustomError(`User not found with give Id:-${userId}`, 404)
            return next(err)
        }
        const updatedUser=await userContext.updateUserByUserId(userId,req.body)
        return res.status(200).json({data:updatedUser})
    } catch (error) {
        return next(error)
    }
}

const deleteUserController = async (req, res, next) => {
    const userId = req.params.id
    try {
        const user = await userContext.getUserByUserId(userId)
        if (!user) {
            const err = new CustomError(`User not found with give Id:-${userId}`, 404)
            return next(err)
        }
        await userContext.deleteUserByUserId(userId)
        return res.status(200).json({msg:"User deleted successfully"})
    } catch (error) {
        return next(error)
    }
}




module.exports={getAllUsersController,getOneUserController,updateUserController,deleteUserController}
