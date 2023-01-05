// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import { gameGraphqlClient } from '../../graphql';
import { playerGraphqlClient } from '../../graphql';

type Data = {
  name?: string;
  data?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let playerId = parseFloat(req.query.id as string);
  // send attack
  const data = (
    await playerGraphqlClient.mutate({
      mutation: gql`
        # mutation {
        mutation ($playerId: Float!) {
          sendAttack(id: $playerId) {
            # sendAttack(id: 19) {
            sentAttacks
            hits
          }
        }
      `,
      variables: { playerId },
    })
  ).data;
  //check for error
  res.status(200).json({ data: data });
}

// type Data = {
//   name?: string
//   data?: unknown
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   let gameId = parseFloat(req.query.gameId)
//   // send attack
//   const data = (await gameGraphqlClient.mutate({
//     mutation: gql`
//       mutation($gameId: Int!) {UpdateP1Hits(updateGameInput:{id: $gameId}){
//   player1Hits
//   player2Hits
// }}
//     `,
//     variables: {gameId}
//   })).data;
//   //check for error
//   res.status(200).json({data: data})
// }
