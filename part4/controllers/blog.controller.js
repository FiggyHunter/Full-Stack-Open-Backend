import Blog from "../models/user.model.js";

const getAllBlogPosts = (_, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

const addBlogPost = (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};

export default { getAllBlogPosts, addBlogPost };
