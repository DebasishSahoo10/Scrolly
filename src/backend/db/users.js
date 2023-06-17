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
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
];
