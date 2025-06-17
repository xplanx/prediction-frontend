import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
}); 