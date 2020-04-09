import gql from "graphql-tag";

const CHARACTERS_QUERY = gql`
  query Characters {
    Character {
      id
      CharecterName
      Avatar {
        url
      }
    }
  }
`;

export default CHARACTERS_QUERY;