const express = require('express');
const router = express.Router();

// home page
router.get('/', (req, res, next)=> {

    let db = req.con;
    let data = "";

    let user = "";
    user = req.query.user;
    
    let filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }

    db.query('SELECT * FROM account ' + filter, user, (err, rows)=> {
        if (err) {
            console.log(err);
        }
         data = rows;

        // use index.ejs
        res.render('index', { title: 'Account Information', data: data, user: user });
    });

});

// add page
router.get('/add', (req, res, next)=> {

    // use userAdd.ejs
    res.render('userAdd', { title: 'Add User'});
});


// add post
router.post('/userAdd', (req, res, next)=> {

    let db = req.con;

    let sql = {
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email
    };

    //console.log(sql);
    let qur = db.query('INSERT INTO account SET ?', sql, (err, rows)=> {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


// edit page
router.get('/userEdit', (req, res, next)=> {

    let id = req.query.id;
    let db = req.con;
    let data = "";

    db.query('SELECT * FROM account WHERE id = ?', id, (err, rows)=> {
        if (err) {
            console.log(err);
        }

         let data = rows;
        res.render('userEdit', { title: 'Edit Account', data: data });
    });

});

router.post('/userEdit', (req, res, next)=> {

    let db = req.con;
    let id = req.body.id;

    let sql = {
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email
    };

   let qur = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], (err, rows)=> {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


router.get('/userDelete', (req, res, next)=> {

    let id = req.query.id;
    let db = req.con;

    let qur = db.query('DELETE FROM account WHERE id = ?', id, (err, rows)=> {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});



module.exports = router;
