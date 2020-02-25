import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation';

import { InMemoryCache, gql, ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';

const typeDefs = gql`
  type Mutation {
    addNote(title: String! body: String!): [Note]
  }
`;

let nextNoteId = 1;

const resolvers = {
  Mutation: {
    addNote: (obj, { title, body }, { cache }) => {
      const query = gql`
        {
          notes @client {
            id
          }
        }
      `
      const currentState = cache.readQuery({ query });

      const newNote = {
        __typename: 'Note',
        id: nextNoteId++,
        title,
        body
      }

      const data = {
        notes: [...currentState.notes, newNote]
      };

      cache.writeData({ data });
      return newNote;
    }
  }
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers
})

cache.writeData({
  data: {
    notes: []
  }
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ApolloProvider>
  );
}
