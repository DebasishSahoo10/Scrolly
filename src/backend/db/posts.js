import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import RadialBlue from "../../assets/Radial-Blue.webp"
import LadyInAir from "../../assets/LadyInAIr.webp"
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
      "The New Macbook wallpapers are sleek and unique 🔥🔥. Probably the best thing out of WWDC 😝",
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
      "Designing is tough. Especially when you have to maintain both UI and UX. CRED is one of best, but its UX !! 😶",
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
    img : LadyInAir,
    content:
      "The way creativity works is a bit different than other professional stuff ✳️. You can't Force it. When it comes it comes.",
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
      "We at Sanvera will soon start hiring interns. Mainly for office works. Watch this space for updates 🦜",
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
      "Bikes and Machines are closest to men 💌. They don't complain. They don't judge. They are the ways men are living since a long time now 🚲🌟",
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
