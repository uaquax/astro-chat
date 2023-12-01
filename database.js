const { MongoClient, ObjectID, ServerApiVersion } = require("mongodb");
const BodyParser = require("body-parser");
const { response } = require("express");

const uri =
  "mongodb+srv://uaquax:OJlGD7130BcVbAPp@astrochat.tcgr0wv.mongodb.net/?retryWrites=true&w=majority";

class Database {
  client;
  collection;

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async connect() {
    try {
      await this.client.connect();
      this.collection = this.client.db("astro-chat").collection("users");
    } catch (e) {
      console.error(e);
    }
  }

  async addUser(id, username) {
    try {
      let result = await this.collection.insertOne({
        sockId: id,
        username: username,
      });
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async getUser(id) {
    try {
      let result = await this.collection.findOne({ sockId: id });
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Database;
