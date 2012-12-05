# ATEAM
## Appcelerator Team Workflow CLI Tools

Work in progress come back later...

## Install
```
npm install -g git+https://github.com/euforic/ateam.git
```

## API

### Help

Outputs usage

```
$ ateam --help
```

### ticket#view

View Ticket on Jira

```
$ ateam ticket <number> view
```

### ticket#fix

Creates a new git branch for the given ticket

```
$ ateam ticket <number> fix
```

### ticket#pullreq

Commits current changes and submits pull request to upstream

```
ateam ticket <number> pullreq
```

### ticket#close

Deletes branches created for ticket and opens up ticket on jira

```
$ ateam ticket <number> close
```

### ticket#review

Creates a git branch for ticket codereview

```
$ ateam ticket <number> review
```

### tcase

Creates a new TI project to execute a test case.

```
$ ateam tcase <ticket> <platform>
```

### tcase#close

Deletes the TI project generated to execute a test case.

```
$ ateam tcase <ticket> <platform>
```