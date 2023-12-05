import model from '../database/models';
const User = model.User;
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decodedToken?.id);

        if (user) {
          req.user = user;
          next();
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("No Token Attached to headers or it has Expired");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { authMiddleware };
