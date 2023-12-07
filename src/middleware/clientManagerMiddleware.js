import Manager from "../model/clientManager.js"
import jwt from "jsonwebtoken";

const managerAuthMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decodedToken?._id);

        if (manager) {
          req.manager = manager;
          next();
        } else {
          throw new Error("Manager not found");
        }
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("No Token Attached to headers or it has Expired");
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized to Perform This Action" });
  }
};
export { managerAuthMiddleware };
