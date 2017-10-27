var models = require('../models');


module.exports.getUser = function (req, res) {
    console.log(req.user)
    if (req.user === undefined)
        res.send({ error: 'user not loggedin', status: 'error' });
    else
        res.send(req.user);
}


module.exports.getDriver = function (req, res) {
    console.log(req.params)
    console.log(req.body)
    console.log(req.query)
    
    models.Driver.findOne({
        where: { UserId: req.params.id}
    }).then(driver => {
        
        if (driver===null)
            res.send({ error: 'user not found', status: 'error' });
        else
        res.send(driver.dataValues);
    })
    if (req.user === undefined && false)
    //    res.send({ error: 'user not loggedin', status: 'error' });
    ;
    else
        ;
      //  res.send(req.user);
}