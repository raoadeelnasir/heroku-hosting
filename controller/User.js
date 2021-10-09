import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
// CREATING THE USER
export const geth = async (request, response) => {
  const { address } = request.body;
  try {
    const token = jwt.sign({address}, process.env.SECRET_TOKEN, {
      expiresIn: "60s",
    });
    response.status(200).send(token);
  } catch (error) {
    response.status(400).send(error);
  }
};

export const userCreate = async (request, response) => {
  const { address } = request.body;
  try {
    const addressExist = await User.findOne({ username: address });
    if (addressExist) {
      const userCountUpdate = {
        userCount: addressExist.userCount + 1,
      };

      const userSave = await User.findOneAndUpdate(
        { username: address },
        userCountUpdate,
        { new: true }
      );
      userSave.save();
      response.status(201).send(userSave);
      return;
    }

    const user = new User({
      username: address,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ address:createdUser.address }, process.env.SECRET_TOKEN, {
      expiresIn: "60s",
    });
    response.status(201).send(token);
  } catch (error) {
    response.status(400).send(error);
  }
};

// DELETE USER

export const deleteUser = async (request, response) => {
  const { address } = request.body;
  try {
    const user = await User.findOne({ username: address });
    if (!user) {
      return response.status(200).send("User does not exist");
    }

    const deleteUser = await User.findOneAndDelete({ username: address });
    response.status(200).send("User deleted successfully");
  } catch (error) {
    response.status(400).send(error);
  }
};

// GET ONE USER
export const getOneUser = async (request, response) => {
  const { address } = request.body;
  try {
    const user = await User.findOne({ username: address });
    if (!user) {
      return response.status(200).send({error:"User does not exist"});
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(400).send(error);
  }
};

// GETTING ALL THE USER
export const getAllTheUser = async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (error) {
    response.status(400).send(error);
  }
};

// Drop Increase
export const dropIncrease = async (request, response) => {
  const { address } = request.body;

  try {
    const userExist = await User.findOne({ username: address });

    if (!userExist) {
      return response
        .status(401)
        .send({ error: "User not exist with that address" });
    }

    const updateDrop = {
      drop: userExist.drop + 1,
    };
    const dropUpdate = await User.findOneAndUpdate(
      { username: address },
      updateDrop,
      { new: true }
    );
    const savingCount = await dropUpdate.save();
    response.status(200).send(savingCount);
  } catch (error) {
    response.status(400).send(error);
  }
};
