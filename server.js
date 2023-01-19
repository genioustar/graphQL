import { ApolloServer, gql } from "apollo-server";

/** ApolloServer 시작을 위해서 파라미터로 변수명을 무조건!!! typeDefs로 해줘야함!
 * gql의 SDL을 작성시 type Query는 필수 항목!
 * Query 안의 text라는 값은 REST API의 GET /text와 같은 의미!
 */

const tweets = [
  {
    id: "1",
    text: "first one!",
  },
  {
    id: "2",
    text: "second one",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`; //여기에 graphql의 schema definition language(SDL)를 설정한다.

const resolvers = {
  Query: {
    tweet(root, { id }) {
      console.log(id);
      return tweets.find((tweet) => tweet.id === id);
    },
    allTweets() {
      return tweets;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}...`);
});
