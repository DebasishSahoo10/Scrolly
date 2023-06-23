import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import RadialBlue from "../../assets/Radial-Blue.webp"
// import dayjs from "dayjs";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    img : RadialBlue,
    content:
      "Here is test sample of what a user can write as the post caption ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "de.3.ev",
    createdAt: new Date("2023-05-10"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Here is test sample of what a user can write as the post caption and just for a normal text post here are some more text ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "de.3.ev",
    createdAt: new Date("2023-05-10"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Here is test sample of what a user can write as the post caption and just for a normal text post here are some more text",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "thehope_",
    createdAt: new Date(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Here is test sample of what a user can write as the post caption and just for a normal text post here are some more text ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "lensflare",
    createdAt: new Date(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Here is test sample of what a user can write as the post caption and just for a normal text post here are some more text ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "7000rpm",
    createdAt: new Date(),
    updatedAt: formatDate(),
  }
];
