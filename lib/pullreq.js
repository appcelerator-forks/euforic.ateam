/*!
 *
 */


// Dependencies
var gh = require('./github')
  , color = require('colors');

/**
 * [printPR description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function printPR( data ) {
  var header = '  [' +data.user.login+ '|#' + data.number + ']';
  console.log(header.bold);
  console.log('  ', data.title.blue);
  console.log('  ', data.body);
  console.log();
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

    if ('array' === typeof resp) {
      resp.forEach(function (req) {
        printPR( req );
      });
    } else {
      printPR( resp );
    }
  });
};

pullreq.submit = function (opts) {
  gh.auth();
  console.log(opts);
  process.exit();
};