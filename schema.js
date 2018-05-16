import { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
 } from 'graphql'
import Db from './db';

const Person = new GrapgQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
      return {
        id: {
          type: GraphQLInt,
          resolve(person) {
            return person.id;
          }
        },
        firstName: {
          type: GraphQLString,
          resolve(person) {
            return person.firstName;
          }
        },
        lastName: {
          type: GraphQLString,
          resolve(person) {
            return person.lastName;
          }
        },
        email: {
          type: GraphQLString,
          resolve(person) {
            return person.email;
          }
        }
      };
    }
  });

  const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This is a description of Post',
    fields: () => {
      return {
        id: {
          type: GraphQLInt,
          resolve(person) {
            return person.id;
          }
        },
        title: {
          type: GraphQLString,
          resolve(post) {
            return post.title;
          }
        },
        content: {
          type: GraphQLString,
          resolve(post) {
            return post.content;
          }
        }
      };
    }
  });

  const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => {
      return {
        people: {
          type: new GraphQLList(Person),
          resolve(root, args)
        }
      };
    }

  });
