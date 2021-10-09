import { boot } from 'quasar/wrappers';
import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Loading, Notify } from 'quasar';
import { createUploadLink } from 'apollo-upload-client';
import {DefaultApolloClient} from '@vue/apollo-composable';

const authLink = setContext((_, { headers, ...context }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('token') as string}`,
    },
    ...context,
  };
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const httpOptions = {
  uri: 'http://localhost:3000/graphql',
};

const httpLink = new HttpLink(httpOptions);
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let error = '';
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      return (error = String(message));
    });
  if (networkError) error = 'Problème de réseau:' + networkError.message;
  Notify.create({
    message: error,
    type: 'warning',
  });
  Loading.hide();
});

// const uploadLink = createUploadLink({ uri: 'http://localhost:3000/graphql', fetchOptions: {mode: 'no-cors'}  });

const uploadLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(httpOptions) as any,
  httpLink
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
