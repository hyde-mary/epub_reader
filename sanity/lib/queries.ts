import { defineQuery } from "next-sanity";

export const USER_BOOKS_QUERY = defineQuery(`
  *[_type == "book" 
  && (user._ref == $userId)] | order(_createdAt desc) {
    _id,
    title,
    user,
    author,
    image_url,
    file_path,
    file_url,
    _createdAt,
}`);

export const BOOKS_BY_ID_QUERY = defineQuery(`
  *[_type == "book" && _id == $id][0] {
  _id,
  title,
  user,
  author,
  image_url,
  file_path,
  file_url,
  _createdAt,
}`);

export const USER_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "user" && id == $id][0]{
        _id,
        id,
        name,
        email,
    }
`);
