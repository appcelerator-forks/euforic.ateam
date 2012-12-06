require('shelljs/global');

var GitHubApi = require("github")
  , kchain = require('kchain');

var github = new GitHubApi({
    version: "3.0.0"
});

var user = user || exec( 'git config user.name', { silent: true } ).output.replace(/\n/g, '');

var creds = {
  account: user,
  service: 'ateamGithub'
};

github.auth = function () {

  kchain.get( creds, function (err,pass) {

    if ( err||(!pass) ) {

      console.log('\n  [ERROR]: Missing or bad saved credentials please run `ateam auth <service>`\n');
      process.exit();
    }

    github.authenticate({
        type: "basic",
        username: creds,
        password: pass
    });
  });
};


module.exports = github;