import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation(
    $uid: ID!
    $firstName: String!
    $lastName: String!
    $name: String!
    $email: String!
    $imageUrl: String!
    $nickname: String!
  ) {
    addUser(
      uid: $uid
      firstName: $firstName
      lastName: $lastName
      name: $name
      email: $email
      imageUrl: $imageUrl
      nickname: $nickname
    )
  }
`;

export const ADD_POST = gql`
  mutation Mutation(
    $text: String
    $photoUrl: String
    $posterUid: ID!
    $posterName: String!
    $posterNickname: String!
    $posterImageurl: String!
  ) {
    addPost(
      text: $text
      photoUrl: $photoUrl
      posterUid: $posterUid
      posterName: $posterName
      posterNickname: $posterNickname
      posterImageurl: $posterImageurl
    )
  }
`;

export const REMOVE_POST = gql`
  mutation Mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation(
    $id: ID!
    $uid: ID!
    $photoUrl: String!
    $name: String!
    $nickname: String!
    $text: String!
  ) {
    addComment(
      id: $id
      uid: $uid
      photoUrl: $photoUrl
      name: $name
      nickname: $nickname
      text: $text
    )
  }
`;

export const REMOVE_COMMENT = gql`
  mutation Mutation($postID: ID!, $commentID: ID!) {
    removeComment(postID: $postID, commentID: $commentID)
  }
`;

export const UPDATE_LIKE = gql`
  mutation Mutation(
    $postID: ID!
    $uid: ID!
    $photoUrl: String!
    $name: String!
    $nickname: String!
  ) {
    updateLike(
      postID: $postID
      uid: $uid
      photoUrl: $photoUrl
      name: $name
      nickname: $nickname
    )
  }
`;
