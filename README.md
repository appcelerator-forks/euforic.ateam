# ATEAM
## Appcelerator Team Workflow CLI Tools

Work in progress come back later...

## Install

```bash
$ npm install -g git+https://github.com/euforic/ateam.git
```

## API

### Help

Outputs usage

```bash
$ ateam --help
```

### ticket#view

View Ticket on Jira

```bash
$ ateam ticket <number> view
```

### ticket#fix

Creates a new git branch for the given ticket

```bash
$ ateam ticket <number> fix
```

### ticket#pullreq

Commits current changes and submits pull request to upstream

```bash
ateam ticket <number> pullreq
```

### ticket#close

Deletes branches created for ticket and opens up ticket on jira

```bash
$ ateam ticket <number> close
```

### ticket#review

Creates a git branch for ticket codereview

```bash
$ ateam ticket <number> review
```

### tcase

Creates a new TI project to execute a test case.

```bash
$ ateam tcase <ticket> <platform>
```

### tcase#close

Deletes the TI project generated to execute a test case.

```bash
$ ateam tcase <ticket> <platform>
```

### auth

Set auth credentials for service

Available Services:

- github

```bash
$ ateam auth <service>
```

### pullreq#view

View all open pull requests

```bash
$ ateam pullreq view <username>/<repo>
```

### pullreq#view

View a certain pull request. To view in browser add the `-b` flag

```bash
$ ateam pullreq view <username>/<repo> -n <number> -b
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
$ ateam pullreq submit
```