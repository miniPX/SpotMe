const db = require('../pdb');

exports.test = async function(req, res) {
    try {
        var result = await db.query('SELECT * FROM user_master');
        res.statusCode = 200; 
        res.json({
            success: true,
            users: result.rows
        });
    }
    catch(err) {
        res.json({error: true}); 
    }
};