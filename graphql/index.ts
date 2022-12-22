import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const playerGraphqlClient = new ApolloClient({
    uri: process.env.PLAYER_SERVICE_URL,
    cache: new InMemoryCache()
  });

export const gameGraphqlClient = new ApolloClient({
  uri: process.env.GAME_SERVICE_URL,
  cache: new InMemoryCache()
});