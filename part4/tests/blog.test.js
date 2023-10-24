import listHelper from "../utils/list_helper.js";
import { DATABASE_URL } from "../utils/config.js";
import Blog from "../models/user.model.js";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../index.js";

const api = supertest(app);

console.log(DATABASE_URL);

const initialPosts = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialPosts[0]);
  await blogObject.save();
  blogObject = new Blog(initialPosts[1]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  console.log(response.body);
});

// test("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/notes");

//   expect(response.body[0].content).toBe("HTML is easy");
// });

// const blogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0,
//   },
// ];

// listHelper.mostBlogs(blogs);

// const listWithOneBlog = [
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
// ];

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });

// describe("Total likes", () => {
//   test("when list of blog posts is forwarded, a sum of all likes is calculated from that list", () => {
//     expect(listHelper.totalLikes(blogs)).toBe(36);
//   });

//   test("when list has only one blog, equals the likes of that", () => {
//     const result = listHelper.totalLikes(listWithOneBlog);
//     expect(result).toBe(5);
//   });
// });

// describe("Finds object with most likes", () => {
//   test("should return the object with the most likes", () => {
//     const result = listHelper.favoriteBlog(blogs);

//     const expectedObject = {
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       likes: 12,
//     };

//     expect(result).toEqual(expectedObject);
//   });
// });

// describe("Finds author with the most blog posts", () => {
//   test("should return the author with most blog posts out of many authors", () => {
//     const result = listHelper.mostBlogs(blogs);
//     const expectedObject = {
//       author: "Robert C. Martin",
//       posts: 3,
//     };
//     expect(result).toEqual(expectedObject);
//   });
// });

// describe("Finds author with the most blog posts", () => {
//   test("should return the author with most blog posts out of many authors", () => {
//     const result = listHelper.mostLikes(blogs);
//     const expectedObject = {
//       author: "Edsger W. Dijkstra",
//       likes: 17,
//     };
//     expect(result).toEqual(expectedObject);
//   });
// });

afterAll(async () => {
  await mongoose.connection.close();
});
