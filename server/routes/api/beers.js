const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const beers = await loadPostsCollection();
    res.send(await beers.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const beers = await loadPostsCollection();
    await beers.insertOne({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        rating: req.body.rating,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
    const beers = await loadPostsCollection();
    await beers.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Update Posts
// router.put('/:id', async (req, res) => {
//    const beers = await loadPostsCollection();
//    await beers.updateOne({_id: new mongodb.ObjectID(req.params.id)});
//    res.status(200).send();
// });

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://andrew:andrew1234@ds127439.mlab.com:27439/vue_express', {
        useNewUrlParser: true
    });
    return client.db('vue_express').collection('beers');
}

module.exports = router;
