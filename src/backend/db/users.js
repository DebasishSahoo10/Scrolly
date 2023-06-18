import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * 
*/

export const users = [
  {
    _id: uuid(),
    firstName: "Tester",
    lastName: "Man",
    username: "thetester_",
    password: "thetester",
    bio : "You want to explore a app, I am here",
    img : "https://i.postimg.cc/5j2YLNQ4/005.webp",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    following: [
      {
        _id: uuid(),
        firstName: "Debasish",
        lastName: "Sahoo",
        username: "de.3.ev",
      },
      {
        _id: uuid(),
        firstName: "Subhasmita",
        lastName: "Rout",
        username: "thehope_",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Debasish",
        lastName: "Sahoo",
        username: "de.3.ev",
      },
      {
        _id: uuid(),
        firstName: "Subhasmita",
        lastName: "Rout",
        username: "thehope_",
      },
      {
        _id: uuid(),
        firstName: "Abhisek",
        lastName: "Mohanty",
        username: "7000rpm",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Debasish",
    lastName: "Sahoo",
    username: "de.3.ev",
    password: "thetester2",
    bio : "The Creator Himself",
    img : "https://i.postimg.cc/5j2YLNQ4/005.webp",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: uuid(),
        firstName: "Tester",
        lastName: "Man",
        username: "thetester_",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Tester",
        lastName: "Man",
        username: "thetester_",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Subhasmita",
    lastName: "Rout",
    username: "thehope_",
    password: "thetester3",
    bio : "to the moon and beyond",
    img : "https://i.postimg.cc/5j2YLNQ4/001.webp",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    following: [
      {
        _id: uuid(),
        firstName: "Tester",
        lastName: "Man",
        username: "thetester_",
      },
    ],
    followers: [
      {
        _id: uuid(),
        firstName: "Tester",
        lastName: "Man",
        username: "thetester_",
      },
    ],
  },
  {
    _id: uuid(),
    firstName: "Abhisek",
    lastName: "Mohanty",
    username: "7000rpm",
    password: "thetester4",
    bio : "exploring lifes and concepts",
    img : "https://i.postimg.cc/5j2YLNQ4/006.webp",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    following: [
      {
        _id: uuid(),
        firstName: "Tester",
        lastName: "Man",
        username: "thetester_",
      },
    ],
    followers: [],
  },
  {
    _id: uuid(),
    firstName: "Smruti",
    lastName: "Sourav",
    username: "lensflare",
    password: "thetester5",
    bio : "buliding creative empire",
    img : "https://i.postimg.cc/5j2YLNQ4/008.webp",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
];
