import express from 'express';
import session from 'express-session';
import passport from 'passport';
import routes from './src/routes/routes.js';
import { engine as exphbs } from 'express-handlebars';
import { ProductsOptions } from './src/db/sqlite3/connection/connection.js';
import ProductsClienteSQL from './src/db/sqlite3/classes/ProductsClass.js';
import * as db from './src/db/mongodb/mongo.js';
import { Server }  from 'socket.io';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

// MONGOOSE && SQLITE3
db.connect();
const products = [];
const sqlProducts = new ProductsClienteSQL(ProductsOptions);

// DIRNAME
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SERVER
const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    cookie:{
        maxAge:60000
        },
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', '.hbs')

// ----- ROUTES ------ //

app.use('/', routes);

// --- SOCKET.IO
const dbClass = new db.Mongo;

io.on('connection', async socket => {
    console.log('New user connected');

        socket.emit('products', products);
        socket.on('update-products', data => {
            products.push(data);

            sqlProducts.crearTabla()
            .then(() => {
                return sqlProducts.addProducts(products)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                return sqlProducts.close()
            })

            io.sockets.emit('products', products);
        })

        let d = await dbClass.getMsg()
        socket.emit('messages', d)

        socket.on('update-chat', async data => {
            await dbClass.addMsgMongo(data)
            let data2 = await dbClass.getMsg()
            io.sockets.emit('messages', data2)
        })
})

// PORT
const PORT =  process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Listening in port ${PORT}`);
})
