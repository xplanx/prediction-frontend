import { gql } from '@apollo/client';

export const GET_PREDICTIONS = gql`
  query GetPredictions($orderBy: String, $orderDirection: String, $limit: Int, $after: String) {
    predictionss(orderBy: $orderBy, orderDirection: $orderDirection, limit: $limit, after: $after) {
      items {
        id
        name
        description
        outcome1
        outcome2
        optionalReward
        b
        url
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PREDICTION_DETAILS = gql`
  query GetPredictionDetails($id: String!) {
    predictions(id: $id) {
      id
      name
      description
      outcome1
      outcome2
      optionalReward
      b
      url
      createdAt
    }
  }
`; 