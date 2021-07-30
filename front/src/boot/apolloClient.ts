import { boot } from 'quasar/wrappers';
import { DefaultApolloClient } from '@vue/apollo-composable';
import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { Notify } from 'quasar';

const authLink = setContext((_, { headers, ...context }) => {
  let token = '';
  token = localStorage.getItem('token') as string; // survive a refresh

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    ...context,
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
    notifyOnNetworkStatusChange: true,
  },
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  },
};

// createU

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: false,
  },
});

const httpOptions = {
  uri: 'http://localhost:3000/graphql',
};

const httpLink = new HttpLink(httpOptions);
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let error = '';
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      return (error = `${message}`);
    });
  if (networkError) error = 'Problème de réseau:' + networkError;
  Notify.create({
    message: error,
    type: 'warning',
  });
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// const uploadLink = createUploadLink({ uri: 'http://localhost:3000/graphql', fetchOptions: {mode: 'no-cors'}  });

const uploadLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(httpOptions) as any,
  link
);

// Create the apollo client
const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(uploadLink),
  cache: new InMemoryCache({ addTypename: true }), // Cache implementation
  connectToDevTools: true,
  defaultOptions,
});

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, apolloClient);
});
