const express = require('express')
const app = express()

const cors = require('cors');
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))

const path = require('node:path')
const uuid4 = require('uuid4')

const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            const randomId = uuid4()
            const ext = path.extname(file.originalname)
            const filename = randomId + ext
            done(null, filename)
        },
        destination(req, file, done) {
            done(null, path.join(__dirname, 'public'))
        }
    })
})
const uploadMiddleware = upload.single('attachedImage')

const PORT = 80

const database = require('./database/index')

app.use(express.static('public'))
app.use(express.static('front/build'))

app.post('/api/signup', (req, res) => {
    const id = req.body.id
    const pw = req.body.pw
    const pwr = req.body.Passwordrewrite
    if (id == null || pw == null || pwr == null) {
        res.json({
            ok: false,
            err: 'no id or password'
        })
        return
    }

    if (pw != pwr) {
        res.json({
            ok: false,
            err: 'password rewrite incorrect'
        })
        return
    }

    if (database.getUserById(id).length != 0) {
        res.json({
            ok: false,
            err: 'same id exist'
        })
        return
    }

    database.addUser(id, pw)
    let user = database.getUserById(id)[0]

    res.json({
        ok: true,
        data: user
    })
})

app.post('/api/signin', (req, res) => {
    const id = req.body.id
    const pw = req.body.pw
    if (id == null || pw == null) {
        res.json({
            ok: false,
            err: 'no id or password'
        })
        return
    }

    const data = database.getUserById(id)
    if (data.length == 0) {
        res.json({
            ok: false,
            err: 'no user'
        })
        return
    }

    let user = data[0]
    if (user.pw != pw) {
        res.json({
            ok: false,
            err: 'wrong password'
        })
        return
    }

    res.json({
        ok: true,
        data: user
    })
})

app.post('/api/post', uploadMiddleware, (req, res) => {
    const userId = req.body.userId
    const title = req.body.title
    const content = req.body.content
    const image = req.file.filename

    database.addPost(userId, title, content, image)
    res.json({
        ok: true
    })
})

app.get('/api/user', (req, res) => {
    const id = req.query.id
    const data = database.getUserById(id)
    if (data.length == 0) {
        res.json({
            ok: false,
            err: 'login info invalid'
        })
    }
    else {
        let user = data[0]
        user.plants = database.getPlantByUserid(user.id)
        user.posts = database.getPostByUserId(user.id)
        res.json({
            ok: true,
            data: user
        })
    }
})

app.get('/api/alluser', (req, res) => {
    res.json(database.getAllUser())
})

app.get('/api/plant', (req, res) => {
    const id = req.query.id
    const data = database.getPlantById(id)
    if (data.length == 0) {
        res.status(404)
    }
    else {
        res.json(data[0])
    }
})

app.get('/api/posts', (req, res) => {
    const id = req.query.id
    const data = database.getPostById(id)
    if (data.length == 0) {
        res.status(404)
    }
    else {
        let post = data[0]
        post.comments = database.getCommentByPostId(post.postId)
        res.json(post)
    }
})

app.get('/api/allpost', (req, res) => {
    res.json({
        data: database.getAllPost()
    })
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})