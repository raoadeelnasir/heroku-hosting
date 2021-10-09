import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
export const authProtection = async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return response.status(401).send({ error: "Not Authroized" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    //const user = await User.findOne({username:verified.address});
    if (!verified) {
      return response.status(404).send({ error: "User not found" });
    }
    //request.user = user;
    next();
  } catch (error) {
    response.status(400).send(error);
  }
};
