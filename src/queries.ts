import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query AllPeople($first: Int) {
    allPeople(first: $first) {
      totalCount
      people {
        name
        gender
        eyeColor
      }
    }
  }
`;
