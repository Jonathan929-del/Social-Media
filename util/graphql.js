// Imports
import gql from "graphql-tag";





// Queries
export const FETCH_POST_QUERY = gql`
  {
      getPosts{
      id body createdAt username likeCount commentCount
      likes{
        username
      }
      comments{
        id username createdAt body
      }
    }
  }
`;