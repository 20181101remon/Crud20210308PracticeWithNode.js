const express = require('express');
const router = express.Router();

// home page
router.get('/', (req, res, next)=> {

    const   {con}   =req;
    // let db = req.con;
    // 使用解構賦值,解構裡面的變數就會接資料,不需要另外一個變數
    let data = "";

   const  {user} = req.query;
    // user = req.query.user;
    
    let filter = "";   
    if (user) {
        filter = 'WHERE userid = ?';
    }

    con.query(`SELECT * FROM account ${filter}`,user, (err, rows)=> {
        if (err) {
            console.log(err);
        }
         data = rows;

        // use index.ejs
        //ES5: res.render('index', { title: 'Account Information', data: data, user: user });
        //物件實字
        res.render('index', { title: 'Account Information', data, user });
    });

});

// add page
router.get('/add', (req, res, next)=> {

    // use userAdd.ejs
    res.render('userAdd', { title: 'Add User'});
});


// add post
router.post('/userAdd', (req, res, next)=> {
    const {con}=req;
    // let db = req.con;

    const {userid,password,email}=res.body;
    let sql = {
        userid: userid,
        password:password,
        email: email
    };

    //console.log(sql);
    //由於const自己就會執行,因此不需要額外再給予另外的值
    con.query('INSERT INTO account SET ?', sql, (err, rows)=> {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


// edit page
router.get('/userEdit', (req, res, next)=> {

    const {id}=req.query;
    // let id = req.query.id;
    const {con}=req;
    // let db = req.con;
    let data = "";

    con.query('SELECT * FROM account WHERE id = ?', id, (err, rows)=> {
        if (err) {
            console.log(err);
        }

         let data = rows;
        res.render('userEdit', { title: 'Edit Account', data });
    });

});

router.post('/userEdit', (req, res, next)=> {

    const {con}=req;
    // let db = req.con;
    const {id}=req.body;
    // let id = req.body.id;

    const {userid,password,email}=req.body;
    let sql = {
        userid: userid,
        password: password,
        email: email
    };

     con.query('UPDATE account SET ? WHERE id = ?', [sql, id], (err, rows)=> {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


router.get('/userDelete', (req, res, next)=> {
   
    const {id}=req.query;
    // let id = req.query.id;

    const {con}=req;
    // let db = req.con;

    con.query('DELETE FROM account WHERE id = ?', id, (err, rows)=> {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});



module.exports = router;
