const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // mysql2ライブラリをインポート
const cors = require('cors');

const app = express();
const port = 4000;

//テストコード
// const password = "hoge";
// let hashed_password = bcrypt.hashSync(password, 10);
// console.log(hashed_password);

// MySQL接続の設定
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hal_cinema',
};

// MySQL接続プールを作成
const pool = mysql.createPool(dbConfig);

// MySQLプールをルーターからアクセス可能にする
app.use((req, res, next) => {
  req.mysql = pool;
  next();
});

// セッションを構成
app.use(session({
  secret: 'hash_key', //名前はhash_key 
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge: 60*60*1000}
}));

// ルーターの設定
const movieRouter = require('./routers/movieRoute');
const cmsRouter = require('./routers/cmsRoute');
const scheduleRouter = require('./routers/scheduleRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/movie', movieRouter);
app.use('/cms', cmsRouter);
app.use('/schedule', scheduleRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
