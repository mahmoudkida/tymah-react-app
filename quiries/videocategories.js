import gql from "graphql-tag";

const VIDEOCATEGORIES_QUERY = gql`
    query videocateogries {
        videocategories {
            id,
            name,
            background{
                url
            },
            videos {
                id,
                Title,
                thumbnail{
                    url
                }
                url
            }
        }
    }
`;

export default VIDEOCATEGORIES_QUERY;