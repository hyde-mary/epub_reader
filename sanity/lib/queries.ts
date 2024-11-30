import { defineQuery } from "next-sanity";

export const USER_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "user" && id == $id][0]{
        _id,
        id,
        name,
        email,
    }
`);
