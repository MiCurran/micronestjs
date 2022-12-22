import { gql } from '@apollo/client';
import { playerGraphqlClient, gameGraphqlClient } from '../graphql';
import HomeView from '../views/Home';

export default function Home({data, gameData}: {data: unknown, gameData: unknown}) {
  return (
    <HomeView
      data={data}
      gameData={gameData}
    />
  )
}
export async function getStaticProps() {
  const { data } = await playerGraphqlClient.query({
    query: gql`
       query{sayHello}
    `,
  });
  const gameData = (await gameGraphqlClient.query({
    query: gql`
       query{FindGameById(id: 1){id}}
    `,
  })).data
  return {
    props: {
      data,
      gameData
    }
  }
}