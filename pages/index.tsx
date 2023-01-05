import HomeView from '../views/Home';

export default function Home() {
  return (
    <HomeView/>
  )
}

// This shows how to use a Graphql query response as Server-side props
// 
// export async function getStaticProps() {
//   const { data } = await playerGraphqlClient.query({
//     query: gql`
//        query{sayHello}
//     `,
//   });
//   const gameData = (await gameGraphqlClient.query({
//     query: gql`
//        query{FindGameById(id: 1){id}}
//     `,
//   })).data
//   return {
//     props: {
//       data,
//       gameData
//     }
//   }
// }