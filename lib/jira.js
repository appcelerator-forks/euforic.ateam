/**
 * Jira rest API
 *
 * NOT FUNCTIONAL CONVERTING TO Apic.js
 *
 */

// Superagent is not exposed through the apic frameworks on node
// because you can easily add it to your package.json via `npm install superagent`

var apic = require('apic');

var schema = {
  user: [
    // username, password
    { action: 'login',   verb:'POST', url:'https://jira.appcelerator.com', path:'/rest/auth/1/session' },
    { action: 'create',  verb:'PUT', path:'' },
    { action: 'remove',  verb:'DELETE' },
    { action: 'login',   verb:'POST' },
    { action: 'credits', verb:'GET' }
  ],
  issue: [
    { action: 'find',   verb:'GET' },
    { action: 'openCount', verb:'PUT' },
    { action: 'remove', verb:'DELETE' },
    { action: 'update', verb:'POST' },
  ],
  project: [
    { action: 'show',   verb:'GET' },
    { action: 'add',    verb:'PUT' },
    { action: 'remove', verb:'DELETE' },
    { action: 'update', verb:'POST' },
    { action: 'search', verb:'GET' }
  ],
  sprint: [
    { action: 'show',   verb:'GET' },
    { action: 'add',    verb:'PUT' },
    { action: 'remove', verb:'DELETE' },
    { action: 'update', verb:'POST' },
    { action: 'search', verb:'GET' }
  ]
};

var apicApi = apic(schema);
    apicApi.baseUrl = 'https://jira.appcelerator.com/rest/api/' + version;

// Export the Generated API
module.exports = apicApi.api;





// ## Find an issue in jira ##
// ### Takes ###
//
// *  issueNumber: the issueNumber to find
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: string of the error
// *  issue: an object of the issue
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290709)
JiraApi.prototype.findIssue = function(issueNumber, callback) {
    var self = this;
    this.login(function() {
        var options = {
            uri: url.format({
                protocol: self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueNumber
            }),
            method: 'GET',
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Invalid issue number.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
                return;
            }

            callback(null, JSON.parse(body));

        });
    });
};

// ## Get the unresolved issue count ##
// ### Takes ###
//
// *  version: version of your product that you want issues against
// *  callback: function for when it's done
//
// ### Returns ###
// *  error: string with the error code
// *  count: count of unresolved issues for requested version
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id288524)

JiraApi.prototype.getUnresolvedIssueCount = function(version, callback) {
    var self = this;
    this.login(function() {
        var options = {
            uri: url.format({
                protocol: self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/version/' + version + '/unresolvedIssueCount'
            }),
            method: 'GET',
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Invalid version.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during findIssueStatus.');
                return;
            }

            body = JSON.parse(body);
            callback(null, body.issuesUnresolvedCount);
        });
    });
};

// ## Get the Project by project key ##
// ### Takes ###
//
// *  project: key for the project
// *  callback: for when it's done
//
// ### Returns ###
// *  error: string of the error
// *  project: the json object representing the entire project
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289232)

JiraApi.prototype.getProject = function(project, callback) {
    var self = this;
    this.login(function() {
        var options = {
            uri: url.format({
                protocol: self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/project/' + project
            }),
            method: 'GET',
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Invalid project.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during getProject.');
                return;
            }

            body = JSON.parse(body);
            callback(null, body);
        });
    });
};

// ## Find the Rapid View for a specified project ##
// ### Takes ###
//
// *  projectName: name for the project
// *  callback: for when it's done
//
// ### Returns ###
// *  error: string of the error
// *  rapidView: rapid view matching the projectName

/**
 * Finds the Rapid View that belongs to a specified project.
 *
 * @param projectName
 * @param callback
 */
JiraApi.prototype.findRapidView = function(projectName, callback) {
  var self = this;
  this.login(function() {
    var options = {
      uri: url.format({
        protocol: self.protocol,
        host: self.host,
        port: self.port,
        pathname: 'rest/greenhopper/' + self.apiVersion + '/rapidviews/list'
      }),
      method: 'GET',
      headers: {
        Cookie: self.cookies.join(';')
      },
      json: true,
    };

    request(options, function(error, response, body) {
      if (response.statusCode === 404) {
        callback('Invalid URL');
        return;
      }

      if (response.statusCode !== 200) {
        callback(response.statusCode + ': Unable to connect to JIRA during rapidView search.');
        return;
      }

      if (response.body !== null) {
        var rapidViews = response.body.views;
        for (var i = 0; i < rapidViews.length; i++) {
          if(rapidViews[i].name.toLowerCase() === projectName.toLowerCase()) {
            callback(null, rapidViews[i]);
            return;
          }
        }
      }
    });
  });
};

// ## Get a list of Sprints belonging to a Rapid View ##
// ### Takes ###
//
// *  rapidViewId: the id for the rapid view
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: string with the error
// *  sprints: the ?array? of sprints
/**
 * Returns a list of sprints belonging to a Rapid View.
 *
 * @param rapidView ID
 * @param callback
 */
JiraApi.prototype.getLastSprintForRapidView = function(rapidViewId, callback) {
  var self = this;
  this.login(function() {
    var options = {
      uri: url.format({
        protocol: self.protocol,
        host: self.host,
        port: self.port,
        pathname: 'rest/greenhopper/' + self.apiVersion + '/sprints/' + rapidViewId
      }),
      method: 'GET',
      headers: {
        Cookie: self.cookies.join(';')
      },
      json:true,
    };

    request(options, function(error, response, body) {
      if (response.statusCode === 404) {
        callback('Invalid URL');
        return;
      }

      if (response.statusCode !== 200) {
        callback(response.statusCode + ': Unable to connect to JIRA during sprints search.');
        return;
      }

      if (response.body !== null) {
        var sprints = response.body.sprints;
        callback(null, sprints.pop());
        return;
      }
    });
  });
};

// ## Add an issue to the project's current sprint ##
// ### Takes ###
//
// *  issueId: the id of the existing issue
// *  sprintId: the id of the sprint to add it to
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: string of the error
//
//
// **does this callback if there's success?**
/**
 * Adds a given issue to a project's current sprint
 *
 * @param issueId
 * @param sprintId
 * @param callback
 */
JiraApi.prototype.addIssueToSprint = function(issueId, sprintId, callback) {
  var self = this;
  this.login(function() {
    var options = {
      uri: url.format({
        protocol: self.protocol,
        host: self.host,
        port: self.port,
        pathname: 'rest/greenhopper/' + self.apiVersion + '/sprint/' + sprintId + '/issues/add'
      }),
      method: 'PUT',
      headers: {
        Cookie: self.cookies.join(';')
      },
      json:true,
      body: {
        issueKeys: [issueId]
      }
    };

    logger.log(options.uri);
    request(options, function(error, response, body) {
      if (response.statusCode === 404) {
        callback('Invalid URL');
        return;
      }

      if (response.statusCode !== 204) {
        callback(response.statusCode + ': Unable to connect to JIRA to add to sprint.');
        return;
      }

    });
  });
};

// ## Create an issue link between two issues ##
// ### Takes ###
//
// *  link: a link object
// *  callback: for when it's done
//
// ### Returns ###
// *  error: string if there was an issue, null if success
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id296682)
/**
 * Creates an issue link between two issues. Link should follow the below format:
 *
 * {
 *   'linkType': 'Duplicate',
 *   'fromIssueKey': 'HSP-1',
 *   'toIssueKey': 'MKY-1',
 *   'comment': {
 *     'body': 'Linked related issue!',
 *     'visibility': {
 *       'type': 'GROUP',
 *       'value': 'jira-users'
 *     }
 *   }
 * }
 *
 * @param link
 * @param errorCallback
 * @param successCallback
 */
JiraApi.prototype.issueLink = function(link, callback) {
    var self = this;
    this.login(function() {
        var options = {
            uri: url.format({
                protocol: self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issueLink'
            }),
            method: 'POST',
            headers: {
                Cookie: self.cookies.join(';')
            },
            json: true,
            body: link
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Invalid project.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during issueLink.');
                return;
            }

            callback(null);
        });
    });
};

// ## Get Versions for a project ##
// ### Takes ###
// *  project: A project key
// *  callback: for when it's done
//
// ### Returns ###
// *  error: a string with the error
// *  versions: array of the versions for a product
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289653)

JiraApi.prototype.getVersions = function(project, callback) {
    var self = this;
    this.login(function() {
        var options = {
            uri: url.format({
                protocol: self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/project/' + project + '/versions'
            }),
            method: 'GET',
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Invalid project.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during getVersions.');
                return;
            }

            body = JSON.parse(body);
            callback(null, body);
        });
    });
};

// ## Create a version ##
// ### Takes ###
//
// *  version: an object of the new version
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: error text
// *  version: should be the same version you passed up
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id288232)
//
/* {
 *    "description": "An excellent version",
 *    "name": "New Version 1",
 *    "archived": false,
 *    "released": true,
 *    "releaseDate": "2010-07-05",
 *    "userReleaseDate": "5/Jul/2010",
 *    "project": "PXA"
 * }
 */
JiraApi.prototype.createVersion = function(version, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/version'
            }),
            method: 'POST',
            json: true,
            body: version,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };
        request(options, function(error, response, body) {
            if (response.statusCode === 404) {
                callback('Version does not exist or the currently authenticated user does not have permission to view it');
                return;
            }

            if (response.statusCode === 403) {
                callback('The currently authenticated user does not have permission to edit the version');
                return;
            }

            if (response.statusCode !== 201) {
                callback(response.statusCode + ': Unable to connect to JIRA during createVersion.');
                return;
            }

            callback(null, body);
        });
    });
};

// ## Pass a search query to Jira ##
// ### Takes ###
//
// *  searchString: jira query string
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: string if there's an error
// *  issues: array of issues for the user
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id296043)
//
JiraApi.prototype.searchJira = function(searchString, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/search'
            }),
            method: 'POST',
            json: true,
            body: {
                jql:searchString,
                startAt: 0,
                fields: ["summary", "status", "assignee", "description"]
            },
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 400) {
                callback('Problem with the JQL query');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during search.');
                return;
            }

            callback(null, body);
        });
    });
};

// ## Get issues related to a user ##
// ### Takes ###
//
// *  user: username of user to search for
// *  open: `boolean` determines if only open issues should be returned
// *  callback: for when it's done
//
// ### Returns ###
//
// *  error: string if there's an error
// *  issues: array of issues for the user
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id296043)
//
JiraApi.prototype.getUsersIssues = function(username, open, callback) {
    jql = "assignee = " + username;
    var openText = ' AND status in (Open, "In Progress", Reopened)';
    if (open) jql += openText;
    this.searchJira(jql, callback);
};

// ## Add issue to Jira ##
// ### Takes ###
//
// *  issue: Properly Formatted Issue
// *  callback: for when it's done
//
// ### Returns ###
// *  error object (check out the Jira Doc)
// *  success object
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290028)
JiraApi.prototype.addNewIssue = function(issue, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue'
            }),
            method: 'POST',
            json: true,
            body: issue,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 400) {
                callback(body);
                return;
            }

            if ((response.statusCode !== 200) && (response.statusCode !== 201)) {
                callback(response.statusCode + ': Unable to connect to JIRA during search.');
                return;
            }

            callback(null, body);
        });
    });
};
// ## Delete issue to Jira ##
// ### Takes ###
//
// *  issueId: the Id of the issue to delete
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  success object
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290791)
JiraApi.prototype.deleteIssue = function(issueNum, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueNum
            }),
            method: 'DELETE',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 204) {
                callback(null, "Success");
                return;
            }

            callback(response.statusCode + ': Error while deleting');
        });
    });
};
// ## Update issue in Jira ##
// ### Takes ###
//
// *  issueId: the Id of the issue to delete
// *  issueUpdate: update Object
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  success string
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290878)
JiraApi.prototype.updateIssue = function(issueNum, issueUpdate, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueNum
            }),
            body: issueUpdate,
            method: 'PUT',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 200) {
                callback(null, "Success");
                return;
            }
            callback(response.statusCode + ': Error while updating');
        });
    });
};
// ## List Transitions ##
// ### Takes ###
//
// *  issueId: get transitions available for the issue
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  array of transitions
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
/*
 *  {
 *  "expand": "transitions",
 *  "transitions": [
 *      {
 *          "id": "2",
 *          "name": "Close Issue",
 *          "to": {
 *              "self": "http://localhost:8090/jira/rest/api/2.0/status/10000",
 *              "description": "The issue is currently being worked on.",
 *              "iconUrl": "http://localhost:8090/jira/images/icons/progress.gif",
 *              "name": "In Progress",
 *              "id": "10000"
 *          },
 *          "fields": {
 *              "summary": {
 *                  "required": false,
 *                  "schema": {
 *                      "type": "array",
 *                      "items": "option",
 *                      "custom": "com.atlassian.jira.plugin.system.customfieldtypes:multiselect",
 *                      "customId": 10001
 *                  },
 *                  "name": "My Multi Select",
 *                  "operations": [
 *                      "set",
 *                      "add"
 *                  ],
 *                  "allowedValues": [
 *                      "red",
 *                      "blue"
 *                  ]
 *              }
 *          }
 *      }
 *  ]}
 */
JiraApi.prototype.listTransitions = function(issueId, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueId + '/transitions'
            }),
            method: 'GET',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 200) {
                callback(null, body.transitions);
                return;
            }
            if (response.statusCode === 404) {
                callback("Issue not found");
            }

            callback(response.statusCode + ': Error while updating');
        });
    });
};
// ## Transition issue in Jira ##
// ### Takes ###
//
// *  issueId: the Id of the issue to delete
// *  issueTransition: transition Object
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  success string
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
JiraApi.prototype.transitionIssue = function(issueNum, issueTransition, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueNum + '/transitions'
            }),
            body: issueTransition,
            method: 'POST',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 204) {
                callback(null, "Success");
                return;
            }
            callback(response.statusCode + ': Error while updating');
        });
    });
};

// ## List all Viewable Projects ##
// ### Takes ###
//
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  array of projects
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289193)
/*
 * Result items are in the format:
 * {
 *      "self": "http://www.example.com/jira/rest/api/2/project/ABC",
 *      "id": "10001",
 *      "key": "ABC",
 *      "name": "Alphabetical",
 *      "avatarUrls": {
 *          "16x16": "http://www.example.com/jira/secure/projectavatar?size=small&pid=10001",
 *          "48x48": "http://www.example.com/jira/secure/projectavatar?size=large&pid=10001"
 *      }
 * }
 */
JiraApi.prototype.listProjects = function(callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/project'
            }),
            method: 'GET',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 200) {
                callback(null, body);
                return;
            }
            if (response.statusCode === 500) {
                callback(response.statusCode + ': Error while retrieving list.');
            }

            callback(response.statusCode + ': Error while updating');
        });
    });
};
// ## Add a worklog to a project ##
// ### Takes ###
// *  issueId: Issue to add a worklog to
// *  worklog: worklog object
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  success string
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id291617)
/*
 * Worklog item is in the format:
 *  {
 *      "self": "http://www.example.com/jira/rest/api/2.0/issue/10010/worklog/10000",
 *      "author": {
 *          "self": "http://www.example.com/jira/rest/api/2.0/user?username=fred",
 *          "name": "fred",
 *          "displayName": "Fred F. User",
 *          "active": false
 *      },
 *      "updateAuthor": {
 *          "self": "http://www.example.com/jira/rest/api/2.0/user?username=fred",
 *          "name": "fred",
 *          "displayName": "Fred F. User",
 *          "active": false
 *      },
 *      "comment": "I did some work here.",
 *      "visibility": {
 *          "type": "group",
 *          "value": "jira-developers"
 *      },
 *      "started": "2012-11-22T04:19:46.736-0600",
 *      "timeSpent": "3h 20m",
 *      "timeSpentSeconds": 12000,
 *      "id": "100028"
 *  }
 */
JiraApi.prototype.addWorklog = function(issueId, worklog, callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issue/' + issueId + '/worklog'
            }),
            body: worklog,
            method: 'POST',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 201) {
                callback(null, "Success");
                return;
            }
            if (response.statusCode === 400) {
                callback("Invalid Fields: " + JSON.stringify(body));
                return;
            }
            if (response.statusCode === 403) {
                callback("Insufficient Permissions");
                return;
            }
            callback(response.statusCode + ': Error while updating');
        });
    });
};
// ## List all Issue Types ##
// ### Takes ###
//
// *  callback: for when it's done
//
// ### Returns ###
// *  error string
// *  array of types
//
// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id295946)
/*
 * Result items are in the format:
 * {
 *  "self": "http://localhost:8090/jira/rest/api/2.0/issueType/3",
 *  "id": "3",
 *  "description": "A task that needs to be done.",
 *  "iconUrl": "http://localhost:8090/jira/images/icons/task.gif",
 *  "name": "Task",
 *  "subtask": false
 * }
 */
JiraApi.prototype.listIssueTypes = function(callback) {
    var self = this;

    this.login(function() {
        var options = {
            uri: url.format({
                protocol:  self.protocol,
                host: self.host,
                port: self.port,
                pathname: 'rest/api/' + self.apiVersion + '/issuetype'
            }),
            method: 'GET',
            json: true,
            headers: {
                Cookie: self.cookies.join(';')
            }
        };

        request(options, function(error, response, body) {
            if (response.statusCode === 200) {
                callback(null, body);
                return;
            }
            callback(response.statusCode + ': Error while retreiving issue types');
        });
    });
};