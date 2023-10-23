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

export default { dummy, totalLikes };
