
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    req.user = { id: decoded.id };  

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default authUser;


