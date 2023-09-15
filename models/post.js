const fs = require('fs')

const path = require('path')

class Post {

    constructor(id, title, body) {
        this.id = id
        this.title = title
        this.body = body
    }

    static all() {

        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                'utf-8',
                (e, content) => {
                            if (e) {
                                reject(e)
                            } else {
                                resolve(JSON.parse(content))
                            }
                        })
        })
    }

    async save() {
        const posts = await Post.all()
        posts.push({
            id: this.id,
            title: this.title,
            body: this.body,
        })

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static async getById(id) {
        const posts = await Post.all()

        return posts.find((p) => p.id == id)
    }

    static async update(id, data) {
        const posts = await Post.all()
        const idx = posts.findIndex((p) => p.id == id)
        const updatedCourse = {
            id: id,
            title: data.title,
            body: data.body
        }

        posts[idx] = updatedCourse

        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

        return updatedCourse

    }

    static async destroy(id) {
        const posts = await Post.all()
        const idx = posts.findIndex((p) => p.id == id)
        posts.splice(idx, 1)
        new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'db', 'posts.json'),
                JSON.stringify(posts),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Post