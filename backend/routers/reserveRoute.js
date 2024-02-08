const express = require('express');
const router = express.Router();

// GETリクエスト - 本日の映画スケジュール情報を取得
router.get('/:scheduleId', (req, res) => {
  const pool = req.mysql;
  const scheduleId = req.params.scheduleId;

  const query = 'SELECT reserveSeatID FROM reservation_detail JOIN reservation ON reservation_detail.reserveID =reservation.reserveID WHERE reservation.scheduleID = ?';
  pool.query(query, [scheduleId], (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'サーバーエラー' });
    }
    res.json(results);
  });
});


router.post('/', (req,res) => {

  
  const pool = req.mysql;
  const scheduleID = req.body.scheduleID;
  const reserveID = req.body.reserveID;
  const reserveSeatID = req.body.reserveSeatID;
});

module.exports = router;