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
ticket.view = function ( tnum ) {
  exec('open https://jira.appcelerator.org/browse/TIMOB-' + tnum);
};


/**
 * [submitPR description]
 * @return {[type]} [description]
 */
ticket.pullreq = function (){
  console.log('[ERROR]: Not implemented.')
};

/**
 * [mkTicketBranch description]
 * @param  {[type]} ticket [description]
 * @return {[type]}        [description]
 */
ticket.fix = function ( tnum ){
  exec('git checkout -b timob-' + tnum);
  exec('git checkout timob-'+ tnum);
  console.log('[TIMOB-' +tnum+ '] branch has been created')
};

/**
 * [rmBranch description]
 * @param  {[type]} ticket [description]
 * @return {[type]}        [description]
 */
ticket.close = function ( tnum ){
  exec('git checkout master');
  exec('git branch -D timob-' + tnum);
  exec('git push origin :timob-' + tnum);
  console.log('[TIMOB-' +tnum+ '] branch has been removed');
  ticket.view( tnum );
};

/**
 * [mkReviewBranch description]
 * @param  {[type]} ticket   [description]
 * @param  {[type]} upstream [description]
 * @return {[type]}          [description]
 */
ticket.review = function ( ticket, upstream ){
  console.log('[ERROR]: Not implemented.')
};