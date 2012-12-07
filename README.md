# ATEAM
## Appcelerator Team Workflow CLI Tools

## Install


NPM Stable version

```bash
$ npm install -g ateam
```

Bleeding edge version

```bash
$ npm install -g git+https://github.com/euforic/ateam.git
```

## API

### Help

Outputs usage. Optional command for its usage.

```bash
$ ateam [command] --help
```

### ticket#view

View Ticket on Jira or Github with `-g` flag

```bash
$ ateam ticket view <ticket-name> [-g]
```

### ticket#fix

Creates a new git branch for the given ticket

```bash
$ ateam ticket fix <ticket-name>
```

### ticket#close

Deletes branches created for ticket and opens up ticket on jira

```bash
$ ateam ticket close <ticket-name>
```

### tcase

Creates a new TI project to execute a test case.

```bash
$ ateam tcase <ticket-name> [-p --platform] <platform>
```

### tcase#close

Deletes the TI project generated to execute a test case.

```bash
$ ateam tcase <ticket-name> [-p] <platform>
```

### auth

Set auth credentials for service

Available Services:

- github

```bash
$ ateam auth <service>
```

### pullreq#view

View all open pull requests. To view in browser add the `-b` flag

```bash
$ ateam pullreq view <username>/<repo> [-b]
```

### pullreq#view

View a certain pull request. To view in browser add the `-b` flag

```bash
$ ateam pullreq view <username>/<repo> -n <ticket-name> [-b]
```

### pullreq#submit

Submit a new pull request

Prompt fields:

- title : _Title of pull request_
- owner : _Repo owner to submit pull request to_
- repo : _Repo to submit pull request to_
- head : _Branch to pull in to owners repo_
- base : _Repo branch to submit pull request to_
- comment : _Pull request ticket comments_

```bash
$ ateam submit pullreq
```