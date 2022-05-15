// messagesRouter.js
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require("../db.js");


//get all music video
router.get("/", (req, res) => {
    connection.query("SELECT * FROM music", (err, results) => {
      if (err) {
          console.log(err);
          return res.send(err);
      }
  
      return res.json({
        messages: results,
      });
    });
});

// Insert a new music video
router.post("/", (req, res) => {
    console.log(req.body);
    const {
        url, 
        artist, 
        title, 
        genre, 
        view_count, 
        details, 
        duration,
    } = req.body;

    if (!url || !artist || !title || !genre || !view_count || !details || !duration) {
        return res.status(400).json({
            error: "All fields are required",
        })
    }

    connection.query(`INSERT INTO music (url, artist, title, genre, view_count, details, duration) values (${mysql.escape(url)}, ${mysql.escape(artist)}, ${mysql.escape(title)}, ${mysql.escape(genre)},${mysql.escape(view_count)},${mysql.escape(details)},${mysql.escape(duration)})`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            results,
        })
    })

});

// Get a music video by id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM music WHERE entryID=${mysql.escape(id)}`, (err, results) => {
        if (err) {
             console.log(err);
             return res.send(err);
      }
  
      if(results.length===0) {
        return res.status(400).json({
            error: "Music not found",
        })
    }

    return res.json({
        messages: results,
    })
})
});


// Delete a music video
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM music where entryID = ${mysql.escape(id)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            results,
        })
    })
});

//update view_count
router.put("/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const {
        view_count, 
    } = req.body;

    if (!view_count) {
        return res.status(400).json({
            error: "view_count is required",
        })
    }

    connection.query(`UPDATE music SET view_count = ${mysql.escape(view_count)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            results,
        })
    })
});


module.exports = router;
