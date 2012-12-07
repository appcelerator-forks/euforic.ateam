require('shelljs/global');

var GitHubApi = require("github")
  , kchain = require('kchain')
  , colors = require('colors');

var github = new GitHubApi({
    version: "3.0.0"
});

var user = user || exec( 'git config user.name', { silent: true } ).output.replace(/\n/g, '');

var creds = {
  account: user,
  service: 'ateamGithub'
};

github.auth = function (fn) {
  var callback = fn || function () {};

  kchain.get( creds, function (err,pass) {

    if ( err||(!pass) ) {
      console.error('\n  [ERROR]:'.red, 'Missing or bad saved credentials please run `ateam auth <service>`\n');
      process.exit(126);
    }

    github.authenticate({
        type: "basic",
        username: creds.account,
        password: pass
    }, function (err, res) {
      if (err) {
        console.error('\n  [ERROR]:'.red, 'Missing or bad saved credentials please run `ateam auth <service>`\n');
        process.exit(126);
      }
    });
    fn();
  });
};


/**
 *
 *
 * TESTING A NEW GIT CONFIG PARSER BELOW
 *
 * WIP
 *
 */




/*
 * get the file handler
 */
var fs = require('fs');

/*
 * define the possible values:
 * section: [section]
 * param: key=value
 * comment: ;this is a comment
 */
var regex = {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
  comment: /^\s*;.*$/
};

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
github.info = function(file, callback){
  if(!callback){
    return;
  }
  fs.readFile(file, 'utf8', function(err, data){
    if(err){
      callback(err);
    }else{
      callback(null, configParser(data));
    }
  });
};

github.infoSync = function(file){
  return configParser(fs.readFileSync(file, 'utf8'));
};

function configParser(data){
  var value = {};
  var lines = data.split(/\r\n|\r|\n/);
  var section = null;
  lines.forEach(function(line){
    if(regex.comment.test(line)){
      return;
    }else if(regex.param.test(line)){
      var matchP = line.match(regex.param);
      if(section){
        value[section][matchP[1]] = matchP[2];
      }else{
        value[matchP[1]] = matchP[2];
      }
    }else if(regex.section.test(line)){
      var match = line.match(regex.section);
      value[match[1]] = {};
      section = match[1];
    }else if(line.length === 0 && section){
      section = null;
    }
  });
  console.log(value)
  return value;
}

module.exports = github;