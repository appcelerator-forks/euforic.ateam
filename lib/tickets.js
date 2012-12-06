/*!
 * Ticket utils library
 */


var cp = require('child_process')
  , exec = cp.exec
  , gh = require('github');

var ticket = module.exports = {};


/**
 * [view description]
 * @param  {[type]} tnum [description]
 * @return {[type]}      [description]
 */
ticket.view = function ( tnum, ghRepo ) {
  if (ghRepo) { return exec('open https://github.com/' + ghRepo + '/issues/' + tnum); }

  exec('open https://jira.appcelerator.org/browse/' + tnum);
};


/**
 * [submitPR description]
 * @return {[type]} [description]
 */
ticket.pullreq = function (){
  console.log('[ERROR]: Not implemented.');
};

/**
 * [mkTicketBranch description]
 * @param  {[type]} ticket [description]
 * @return {[type]}        [description]
 */
ticket.fix = function ( tnum ){
  exec('git checkout -b ' + tnum);
  exec('git checkout '+ tnum);
  console.log('[#' +tnum+ '] fix branch has been created');
};

/**
 * [rmBranch description]
 * @param  {[type]} ticket [description]
 * @return {[type]}        [description]
 */
ticket.close = function ( tnum ){
  exec('git checkout master');
  // Remove ticket fix branch
  exec('git branch -D ' + tnum);
  exec('git push origin :' + tnum);
  // Remove ticket review branch
  exec('git branch -D review/' + tnum);
  exec('git push origin :review/' + tnum);
  console.log('[#' +tnum+ '] branches have been removed');
  ticket.view( tnum );
};

/**
 * [mkReviewBranch description]
 * @param  {[type]} ticket   [description]
 * @param  {[type]} upstream [description]
 * @return {[type]}          [description]
 */
ticket.review = function ( ticket, upstream ){
  exec('git checkout -b review/' + tnum);
  exec('git checkout review/'+ tnum);
  console.log('[#' +tnum+ '] review branch has been created');
};