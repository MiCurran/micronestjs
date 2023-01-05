// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import { gameGraphqlClient } from '../../graphql';

type Data = {
  name?: string;
  data?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const winnerId = parseInt(req.query.winnerId as string);
  const gameId = parseInt(req.query.gameId as string);
  const data = (
    await gameGraphqlClient.mutate({
      mutation: gql`
        mutation ($winnerId: Int!, $gameId: Int!) {
          UpdateWinner(
            updateGameInput: { id: $gameId, gameWinner: $winnerId }
          ) {
            id
            createdAt
            gameWinner
          }
        }
      `,
      variables: { winnerId: winnerId, gameId: gameId },
    })
  ).data;
  //check for error
  res.status(200).json({ data: data });
}
