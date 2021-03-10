const User = require("../users/users-model");
const Post = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, Timestamp: ${Date().toString()}`)
  next();
}

const validateUserId = async (req, res, next) => {
  try {
      const user = await User.getById(req.params.id);
      console.log(user)
      if (!user) {
          res.status(404).json({ message: "user not found" });
      } else {
        req.user = user;
        next();
      }
  } catch (e) {
      res.status(500).json({ message: e });
  }
};

const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  try {
      const post = await Post.getByID(id);
      if (post) {
          req.post = post;
          next();
      } else {
          res.status(404).json({ message: "post not found" });
      }
  } catch (e) {
      res.status(500).json({ message: e });
  }
};

const validateUser = (req, res, next) => {
  if (!req.body) {
      res.status(400).json({ message: "missing required name field" });
  } else if (!req.body.name) {
      res.status(400).json({ message: "missing user data" });
  } else {
      next();
  }
};

const validatePost = (req, res, next) => {
  if (!req.body) {
      res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
  } else {
      next();
  }
};

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validatePostId,
  validateUser,
  validatePost,
};
