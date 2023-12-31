const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const sum = blogPosts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
  return sum;
};

const favoriteBlog = (blogPosts) => {
  // Use reduce to find the object with the most likes, and destructure the properties of that object
  const { author, likes, title } = blogPosts.reduce((max, obj) => {
    return obj.likes > max.likes ? obj : max;
  }, blogPosts[0]);
  // Create and return an object with the author, likes, and title of the favorite blog, based on the above generated object
  return { author, likes, title };
};

const mostBlogs = (blogPosts) => {
  const blogPostsPerAuthor = new Map();
  let maxAuthor = null;

  for (const blogPost of blogPosts) {
    const author = blogPost.author;
    const authorData = blogPostsPerAuthor.get(author) || {
      author: author,
      posts: 0,
    };
    authorData.posts++;
    blogPostsPerAuthor.set(author, authorData);

    if (!maxAuthor || authorData.posts > maxAuthor.posts) {
      maxAuthor = authorData;
    }
  }
  return maxAuthor;
};

const mostLikes = (blogPosts) => {
  const likesPerAuthor = new Map();
  let maxLikesAuthor = null;

  for (let post of blogPosts) {
    let authorName = post.author;
    let authorData = likesPerAuthor.get(authorName) || {
      author: authorName,
      likes: 0,
    };
    authorData.likes += post.likes;
    likesPerAuthor.set(authorName, authorData);

    if (maxLikesAuthor === null || authorData.likes > maxLikesAuthor.likes)
      maxLikesAuthor = authorData;
  }
  return maxLikesAuthor;
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
