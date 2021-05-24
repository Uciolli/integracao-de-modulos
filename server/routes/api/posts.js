const { response } = require("express");
const express = require("express");
const mongodb = require('mongodb');

const router = express.Router();

const uri = "mongodb+srv://vue123:vue_123@cluster0.mauxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get("/",
    async(req, res) => {
        const post = await loadPostsCollection();
        res.send(await post.find({}).toArray());
    }
)

router.post("/",
    async (req, res) => {
        const post = await loadPostsCollection();
        let response = await post.insertOne({
            text: req.body.text,
            createdAt: new Date()
        });
        res.status(201).send(response);
    }
)

router.delete("/:id",
    async (req, res) => {
        const post = await loadPostsCollection();
        let response = await post.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send(response);
    }
)


async function loadPostsCollection() {
    await client.connect();
    return client.db("vue_express").collection('posts');
}

module.exports = router;
