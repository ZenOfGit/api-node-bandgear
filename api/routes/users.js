const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
      mesage: 'Handling GET requests to /users'
   })
});

router.post('/', (req, res, next) => {
   res.status(201).json({
      mesage: 'Handling POST requests to /users'
   })
});

router.get('/:userId', (req, res, next) => {
   const id = req.params.userId;
   res.status(200).json({
      message: 'You passed ' + id + ' as the id'
   });
});

router.patch('/:userId', (req, res, next) => {
   const id = req.params.userId;
   res.status(200).json({
      message: 'User with id ' + id + ' has been updated'
   });
});

router.delete('/:userId', (req, res, next) => {
   const id = req.params.userId;
   res.status(200).json({
      message: 'User with ' + id + ' has been deleted'
   });
});

module.exports = router;