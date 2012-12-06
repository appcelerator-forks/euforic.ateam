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
      console.log('\n  [ERROR]:'.red, 'Missing or bad saved credentials please run `ateam auth <service>`\n');
      process.exit();
    }

    github.authenticate({
        type: "basic",
        username: creds.account,
        password: pass
    }, function (err, res) {
      if (err) {
        console.log('\n  [ERROR]:'.red, 'Missing or bad saved credentials please run `ateam auth <service>`\n');
        process.exit();
      }
    });
    fn();
  });
};


module.exports = github;