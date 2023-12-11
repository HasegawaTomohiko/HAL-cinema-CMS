const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();

// GETリクエスト - 本日の映画スケジュール情報を取得
router.get('/', (req, res) => {
  const pool = req.mysql;

  const query = 'SELECT s.scheduleID, m.movieName, s.screenID, s.scheduleStartDatetime FROM schedule s JOIN movie m ON s.movieID = m.movieID WHERE DATE(s.scheduleStartDatetime) = CURRENT_DATE() ORDER BY s.scheduleStartDatetime';

  pool.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'サーバーエラー' });
    }

    const schedules = results.map(schedule => ({
      ...schedule,
      scheduleStartDatetime: moment.tz(schedule.scheduleStartDatetime,'Asia/Tokyo').format(),
    }));
    res.json(schedules);
  });
});

// POSTリクエスト - 新しいスケジュールを追加
router.post('/', (req, res) => {
  const pool = req.mysql;
  const movieID = req.body.movieID;
  const screenID = req.body.screenID;
  // const scheduleStartDatetime = req.body.scheduleStartDatetime;
  const scheduleStartDatetime = moment.tz(req.body.scheduleStartDatetime,'Asia/Tokyo');
  try {
    const query = 'INSERT INTO schedule (movieID, screenID, scheduleStartDatetime) VALUES (?, ?, ?)';
    pool.query(query, [movieID, screenID, scheduleStartDatetime.format()], (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'サーバーエラー' });
      }
      res.json({ msg: '新規追加しました！' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'エラーが発生しました' });
  }
});

// PUTリクエスト - スケジュールを更新
router.put('/:scheduleID', (req, res) => {
  const pool = req.mysql;
  const scheduleID = req.params.scheduleID;
  const movieID = req.body.movieID;
  const screenID = req.body.screenID;
  const scheduleStartDatetime = req.body.scheduleStartDatetime;

  try {
    const query = 'UPDATE schedule SET movieID=?, screenID=?, scheduleStartDatetime=? WHERE scheduleID=?';
    pool.query(query, [movieID, screenID, scheduleStartDatetime, scheduleID], (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'サーバーエラー' });
      }
      res.json({ msg: '更新しました！' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'エラーが発生しました' });
  }
});

module.exports = router;
