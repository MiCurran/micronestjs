// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client';
import { playerGraphqlClient } from '../../graphql';

type Data = {
  name?: string
  data?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query);
  // {gameId: 2}
  const data = (await playerGraphqlClient.mutate({
    mutation: gql`
      mutation {
  initPlayer(data: {gameId: 1}){
    gameId
  }
}
    `,
  })).data;
  //check for error 
  res.status(200).json({data: data})
}
