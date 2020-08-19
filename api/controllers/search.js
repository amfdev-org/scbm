const db = require('../database')
const Op = db.Op;

const utils = require('../utils')
const CommenterScraper = require('../scrapers/commenter')
const CommenterModel = require('../models/commenter')
const SearchModel = require('../models/search')
const MessageModel = require('../models/message')

module.exports.getSearches = (req, res) => {
    
    if (!req.session.user) {
        console.log('no session')
        res.end();
    }
    
    console.log('GET /searches/ - ' + req.query.type);
    
        SearchModel.Search.findAll({
        where: {
              user: req.session.user.scUsername,
              search: {
                [Op.not]: req.session.user.scProfile
              },
              type: req.query.type
            },
            group: ['search'],
            order: [
            ['createdAt', 'DESC']
            ],
            limit: 10
        })
        .then(function (searches) {
            //console.log(messages);
            //console.log('check for logged messages then block')
            //console.log(data)
            if (searches.length === 0) {
                console.log('no logged searches for type: '+req.query.type)
            } else {
                console.log(searches.length + ' logged searches for type: '+req.query.type)
            }
            
            res.send(searches);

        }).catch(error => {
           console.log(error)
           reject(error)
        });
        

        
}