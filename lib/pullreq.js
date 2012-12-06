/*!
 *
 */


// Dependencies
var gh = require('./ghub')
  , color = require('colors');

/**
 * [printPR description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */

function printPR( data ) {
  var header = ' ['+ ('#' + data.number).bold + ' | ' + (data.title).green  + ' ]';
  console.log('------------------------------------------------'.bold);
  console.log(header);
  console.log(' Submitted by: '.cyan + (data.user.login).grey);
  console.log('', (data.body).grey);
}

// main export

var pullreq = module.exports = {};

/**
 * [view description]
 * @param  {[type]} path [description]
 * @param  {[type]} id   [description]
 * @return {[type]}      [description]
 */

pullreq.view = function ( path, id ) {

  var repo = path.split('/');
  var req = (id) ? 'get' : 'getAll';
  var opts = {
      user   : repo[0]
    , repo   : repo[1]
    , state  : 'open'
    , number : id
  };

  console.log('\n  Fetching Pull Request(s) for: '.grey, path.grey ,'\n');


  gh.pullRequests[req]( opts, function ( err, resp ) {
    if (err) { console.log(  '[ERROR]: No pull request(s) found'.red ); process.exit(); }

    if (Array.isArray(resp)) {
      resp.forEach(function (req) {
        printPR( req );
      });
    } else {
      printPR( resp );
    }
  });
};

/**
 * [submit description]
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */

pullreq.submit = function (opts) {
  gh.auth(function(err, res) {
    gh.pullRequests.create({
      user  : opts.owner,
      repo  : opts.repo,
      title : opts.title,
      base  : opts.base,
      body  : opts.body,
      head  : opts.user + ':' + opts.head
    }, function (err, res ) {
      if(!err){
        var resp = '\n  Pull Requests [#' + res.number + '] Submitted \n';
        console.log(resp.grey);
      } else {
        try{
          var msg = JSON.parse(err.message).errors[0].message;
          console.log('[ERROR]: '.red, msg);
        } catch(e){
          console.log('[ERROR]: '.red, err);
        }
      }
      process.exit();
    });
  });
};