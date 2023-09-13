const Post = require('../models/post')

const all = async (req, res) => {

    const posts = await Post.all()

    res.json(posts)

}

const store = async (req, res) => {

  /*  const post = new Post(req.body.id, req.body.title, req.body.body)

    await post.save()

    res.status(201).json(post)*/
    res.status(201).json(req.body)

}

const show = async (req, res) => {

    const post = await Post.getById(req.params.id)

    res.json(post)

}

const update = async (req, res) => {

    const post = await Post.update(req.params.id, req.body)

    res.json(post)

}

const destroy = async (req, res) => {

    await Post.destroy(req.params.id)

    res.status(204).send()

}

module.exports = {all, store, show, update, destroy}