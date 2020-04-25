import gql from "graphql-tag";

const FOODS_QUERY = gql`
    query foods {
        foods {
            id,
            Name,
            Description,
            Type,
            Image{
                url
            }
        }
    }
`;

export default FOODS_QUERY;