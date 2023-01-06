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
  res.status(200).json(data);
}
