/**
 * Titanium SDK Builder
 *
 */


require('shelljs/global');


var sdk = module.exports = {}
  , colors = require('colors')
  , Emitter = require('events').EventEmitter
  , skid = new Emitter();

/**
 * [build description]
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
sdk.build = function (opts) {

  var version = (opts.vname) ? 'version_tag='+opts.vname : '';

  console.log('\n  [BUILD]: '.green, 'building SDK for requested targets'.grey);

  var builder = exec('scons ' + version +
      ' iphone=' + (opts.ios||0) +
      ' mobileweb=' + (opts.mobileweb||0) +
      ' build_jsca=' + (opts.jsca||0) +
      ' android=' + (opts.android||0)
    , { silent : true });

  console.log('\n  [INSTALL]: '.green, 'unzipping and installing sdk'.grey);

  var zipFile = ls('dist/*.zip')[0];
  var vName = zipFile.replace('dist/mobilesdk-', '').replace('-osx.zip', '');

  // unzip and move sdk to default directory

  exec('unzip -oqq ' + zipFile + ' -d ' + env.HOME + '/Library/Application\\ Support/Titanium/');
  exec('rm -rf dist/*.zip');

  console.log('\n  [DONE]: '.green, 'Titanium SDK version'.grey, vName.grey.bold , 'installed'.grey, '\n');

};