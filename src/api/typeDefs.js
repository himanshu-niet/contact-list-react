import {
  gql,
} from "@apollo/client";

const GET_CONTACTS = gql`
  query {
    contacts {
      firstName
      lastName
      email
      phone
      _id
    }
  }

`;

const CREATE_USER = gql`
  mutation RegisterMutation(
    $name: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    createUser(name: $name, email: $email, phone: $phone, password: $password)
  }
`;

const LOGIN_USER = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    user( email: $email,password: $password)
  }
`;


const CREATE_CONATCT = gql`
  mutation ContactMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    )
  }
`;


const DELETE_CONATCT = gql`
  mutation DeleteMutation(
    $_id:String!
  ) {
    deleteContact(
     _id:$_id
    )
  }
`;



const UPDATE_CONATCT = gql`
  mutation ContactMutation(
    $_id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
  ) {
    updateContact(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    )
  }
`;

export {
  GET_CONTACTS,
  CREATE_USER,
  LOGIN_USER,
  CREATE_CONATCT,
  DELETE_CONATCT,
  UPDATE_CONATCT,
};