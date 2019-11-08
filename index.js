const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const encoding = require('./encoding');
const csurf = require('csurf');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require("./s3");
const { s3Url } = require("./config");
const fs = require('fs');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });


//Configuring multer and uidsafe for uploading files.
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//Middleware for serving files from the server.
app.use(express.static('./src'));

//Middleware for compressing responses.
app.use(compression());

//Middleware for cookieSession.
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//Middleware for recognizing the incoming Request Object as strings or arrays.
// app.use(express.urlencoded({extended: false}));

//Middleware for recognizing the incoming Request Object as a JSON Object.
app.use(express.json({ limit: '10mb' }));


//Middleware to secure against CSURF attacks.
app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

//Configuring boundler.
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


// Route number 1
app.get('/welcome', function(req, res) {
    req.session.userId ? res.redirect('/') : res.sendFile(__dirname + '/index.html');
});

// Route number 2
app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    encoding.toHash(password)
        .then( result => db.registerNewUser(firstname, lastname, email, result))
        .then( ({ rows }) => {
            req.session.userId = rows[0].id;
            res.json();
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

// Route number 3
app.post('/login', (req, res) => {
    let id;

    return db.logIn(req.body.email)
        .then(({ rows }) => {
            id = rows[0].id;
            //For later uses I used Promise All in case I wanna send more queries other purposes.
            return Promise.all([
                encoding.toCompare(req.body.password, rows[0].password)
            ]);
        })
        .then(result => {
            if(result[0]) {
                req.session.userId = id;
                res.json();
            } else if(!result[0]) {
                throw new Error;
            }
        }
        )
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

    // return (async () => {
    //     try {
    //         const { rows } = await db.logIn(req.body.email);
    //         id = rows[0].id;
    //         const { rows } = await encoding.toCompare(req.body.password, rows[0].password);
    //     } catch(err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //     }
    // })();
});

//Route 4
app.get('/user', (req, res) => {
    // return db.getUserInfo(req.session.userId)
    //     .then(({rows}) => {
    //         res.json(rows);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.getUserInfo(req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 5
app.get('/api/user/:id', (req, res) => {
    let { id } = req.params;
    if( id == req.session.userId) {
        res.json( {"error": "same id"});
    } else {
        // return db.getUserInfo(id)
        //     .then(({rows}) => {
        //         res.json(rows);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         res.sendStatus(500);
        //     });
        return (async () => {
            try {
                const { rows } = await db.getUserInfo(id);
                res.json(rows);
            } catch(err) {
                console.log(err);
                res.sendStatus(500);
            }
        })();
    }
});


//Route 6
app.post('/upload', uploader.single('image'), s3.upload, function(req, res) {
    const url = `${s3Url}${req.file.filename}`;

    // return db.editProfilePic(url, req.session.userId)
    //     .then(({ rows }) => {
    //         res.json(rows);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.editProfilePic(url, req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 7
app.post('/bio', (req, res) => {
    const { bio } = req.body;
    // return db.updateBio(bio, req.session.userId)
    //     .then(() => res.json())
    //     .catch(error => {
    //         console.error(error);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            await db.updateBio(bio, req.session.userId);
            res.json();
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});


const createFile = (req, res, next) => {
    let base64String = req.body.imageBinary;
    let base64Image = base64String.split(';base64,').pop();

    return  uidSafe(24)
        .then(function(uid) {
            fs.writeFile(`./uploads/${uid}.jpg`, base64Image, {encoding: 'base64'}, function() {
                console.log('File created');
                res.locals.imageName = `${uid}.jpg`;
                res.locals.imagePath = `./uploads/${uid}.jpg`;
                next();
            });
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
};

//Route 8
app.post('/capture', createFile, s3.u, (req, res) => {
    const url = `${s3Url}${res.locals.imageName}`;
    console.log(url);
    // return db.editProfilePic(url, req.session.userId)
    //     .then(({ rows }) => {
    //         res.json(rows);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.editProfilePic(url, req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});


//Route 9
app.get('/api/users', (req, res) => {
    // return db.recentlyJoinedUsers()
    //     .then(({rows}) => {
    //         res.json(rows);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.recentlyJoinedUsers();
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 10
app.get('/search/:input', (req, res) => {
    let { input } = req.params;
    // return db.findUsers(input, req.session.userId)
    //     .then(({ rows }) => {
    //         res.json(rows);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.findUsers(input, req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 11
app.post('/friendship', (req, res) => {
    const { receiver_id } = req.body;
    // return db.checkFriendship(receiver_id, req.session.userId)
    //     .then(({ rows }) => {
    //         res.json(rows);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            const { rows } = await db.checkFriendship(receiver_id, req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 12
app.post('/sendRequest', (req, res) => {
    const { receiver_id } = req.body;
    // return db.createFriendshipRequest(req.session.userId, receiver_id)
    //     .then(() => {
    //         res.json({"request":"sent"});
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            await db.createFriendshipRequest(req.session.userId, receiver_id);
            res.json({"request":"sent"});
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 13
app.post('/cancelRequest', (req, res) => {
    const { id } = req.body;
    // return db.cancelFriendshipRequest(id, req.session.userId)
    //     .then(() => {
    //         res.json({"request":"deleted"});
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            await db.cancelFriendshipRequest(id, req.session.userId);
            res.json({"request":"deleted"});
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 14
app.post('/acceptRequest', (req, res) => {
    const { id } = req.body;
    // return db.acceptFriendRequest(id, req.session.userId)
    //     .then(() => {
    //         res.json({"request":"accepted"});
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    return (async () => {
        try {
            await db.acceptFriendRequest(id, req.session.userId);
            res.json({"request":"accepted"});
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

//Route 15
app.get('/api/friends-wannabes', (req, res) => {
    return (async () => {
        try {
            const { rows } = await db.friendsAndWannabes(req.session.userId);
            res.json(rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    })();
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});


// Star Route (must be the last route)
app.get('*', function(req, res) {
    !req.session.userId ? res.redirect('/welcome') : res.sendFile(__dirname + '/index.html');
});


server.listen(8080, function() { console.log("I'm listening."); });


io.on('connection', function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    console.log(`socket with the id ${socket.id} amd the user id ${userId} is now connected`);

    (async () => {
        try {
            const { rows } = await db.getMessages();
            io.sockets.sockets[socket.id].emit('chatMessages', rows);
        } catch(err) {
            console.log(err);
        }
    })();



    socket.on('chatMessage', async function(message) {
        try {
            const { rows } = await db.newMessage(userId, message);
            const sender = await db.getMessageSenderInfo(userId);
            const msg = [{...rows[0], ...sender.rows[0]}];
            console.log(msg);
            io.sockets.emit('chatMessage', msg);
        } catch(err) {
            console.error(err);
        }

    });




    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
    //
    // socket.on('thanks', function(data) {
    //     console.log(data);
    // });
    //
    // socket.on('chatMessage', function() {
    //     console.log('yooooy');
    // });
    //
    // socket.emit('welcome', {
    //     message: 'Welome. It is nice to see you'
    // });
});
