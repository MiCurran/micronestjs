// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client';
import { gameGraphqlClient } from '../../graphql';

type Data = {
  name?: string
  data?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = (await gameGraphqlClient.mutate({
    mutation: gql`
       mutation {CreateGame{
  id
  createdAt
  isActive
}}
    `,
  })).data;
  //check for error 
  res.status(200).json({data: data})
}
