import { gql } from '@apollo/client';

// export const RegisterMutation = gql`
// mutation Register($username: String!, $email: String!, $password: String!, $inviteToken: String!) {
//     Register(Register: {username: $username, email: $email, password: $password, inviteToken: $inviteToken}) {
//     id
//   }
// }
// `;





export const RegisterMutation = gql`
mutation Register($username: String!, $email: String!, $password: String!, $inviteToken: String, $fullName: String!) {
  Register(Register: {
    username: $username,
    email: $email,
    password: $password,
    inviteToken: $inviteToken,
    fullName: $fullName
  }) {
    id
  }
}
`;


