import { ApolloClient, ApolloProvider } from '@apollo/client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import URLs from '../constants/URLs';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${URLs.API_URL}/graphql`
});
const client = new ApolloClient({
  cache,
  link
});

export default client;