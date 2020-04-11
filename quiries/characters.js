import gql from "graphql-tag";

const CHARACTERS_QUERY = gql`
query characters {
  characters {
    id,
    CharecterName,
    Avatar{
      url
    }
  }
}
`;

export default CHARACTERS_QUERY;