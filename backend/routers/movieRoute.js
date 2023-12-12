const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid');
const bcrypt = require('bcrypt'); // 必要ならばbcryptを追加

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/xampp/htdocs/HAL-cinema/image/movie/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const filename = uuid.v4() + '.' + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  // MySQLプールにアクセス
  const pool = req.mysql;

  // MySQLクエリや操作を実行


  //ここから欲しいデータの取得するクエリを書いていく
  pool.query('SELECT * FROM movie', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// 画像を保存するエンドポイント
router.post('/', upload.fields([{ name : 'movieImage', maxCount : 1}]), (req, res) => {
  const pool = req.mysql;
  const movieID = req.body.movieID;
  const movieContext = req.body.movieContext;
  const movieName = req.body.movieName;
  const movieImageName = req.files.movieImage[0].filename;
  const movieLenght = req.body.movieLenght;

  const query = 'INSERT INTO movie (movieID, movieName, movieContext, movieImagePath ,movieLenght) VALUES (?,?,?,?,?)';

  pool.query(query, [movieID,movieName,movieContext,movieImageName,movieLenght], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ msg: '新規追加しました！' });
    }
  });
});

module.exports = router;