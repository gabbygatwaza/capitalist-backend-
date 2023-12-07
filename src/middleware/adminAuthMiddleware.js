import Admin from "../model/admin.js"
import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decodedToken?._id);

        if (admin) {
          req.admin = admin;
          next();
        } else {
          throw new Error("Admin not found");
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
export { adminAuthMiddleware };
