import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      uid
      firstName
      lastName
      name
      email
      createdAt
      nickname
    }
  }
`;

export const GET_USER = gql`
  query getUser($uid: ID!) {
    userById(uid: $uid) {
      uid
      firstName
      lastName
      name
      email
      imageUrl
      createdAt
      nickname
    }
  }
`;

export const GET_USER_WITH_NICKNAME = gql`
  query getUserByNickname($nickname: String!) {
    userByNickname(nickname: $nickname)
  }
`;

export const GET_USER_POST = gql`
  query getUserPost($uid: ID!) {
    userById(uid: $uid) {
      _id
      text
      photoUrl
      posterUid
      posterName
      posterNickname
      posterImageurl
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      _id
      text
      photoUrl
      posterUid
      posterName
      posterNickname
      posterImageurl
      createdAt
      comments {
        _id
        uid
        photoUrl
        name
        nickname
        text
        createdAt
      }
      likes {
        uid
        photoUrl
        name
        nickname
      }
    }
  }
`;

export const GET_POST = gql`
  query Query($id: ID!) {
    post(id: $id) {
      _id
      text
      photoUrl
      posterUid
      posterName
      posterNickname
      posterImageurl
      createdAt
      comments {
        _id
        uid
        photoUrl
        name
        nickname
        text
        createdAt
      }
      likes {
        uid
        photoUrl
        name
        nickname
      }
    }
  }
`;

export const GET_POST_COMMENT = gql`
  query Query($id: ID!) {
    postComment(id: $id) {
      _id
      uid
      photoUrl
      name
      nickname
      text
      createAt
    }
  }
`;
