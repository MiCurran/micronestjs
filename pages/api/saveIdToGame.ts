// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client';
import { playerGraphqlClient, gameGraphqlClient } from '../../graphql';

type Data = {
  name?: string
  data?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   let {gameId, playerId} = req.body;
   let {playerNumber} = req.query;
   let mutation = gql`
   mutation($gameId: Int!, $playerId: Int!) {
UpdatePlayerIDs(updateGameInput: {id: $gameId, player1Id: $playerId}){
 id
 player1Id
 player2Id
 isActive
}
}
 `;

// there has to be a better way to do this... 
// we set default player slot as playerOne
// if the req contains a query string "?playerNumber=2" we set player 2 instead
if (parseInt(playerNumber as string) === 2) {
    // set Player1Id
    mutation = gql`
    mutation($gameId: Int!, $playerId: Int!) {
UpdatePlayerIDs(updateGameInput: {id: $gameId, player2Id: $playerId}){
  id
  player1Id
  player2Id
  isActive
}
}
  `
  }
    const data = (await gameGraphqlClient.mutate({
      mutation: mutation,
      variables: {gameId, playerId}
    })).data;
   //check for error 
  res.status(200).json({data: {initPlayer: data}})
}
