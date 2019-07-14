# Intro

`slingpackager` is a nodejs based command line tool alternative to the [Content Package Maven Plugin](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/vlt-mavenplugin.html) from Adobe or the
[Content Package Maven Pluging](https://wcm.io/tooling/maven/plugins/wcmio-content-package-maven-plugin/) from
[WCM.IO](https://wcm.io). It allows to work with content
packages intended for any [Apache Sling](https://sling.apache.org) based product using composum as its
package manager or Adobe AEM with the CRX package manager. 

It covers the following use cases:

- build a content package form a local folder
- upload a content package onto a server
- install a content package on a server
- list all installed packages on the server
- uninstall a content package from the server
- delete a content package on the server

For an example project using the `slingpackager` please have a look at the [simple-sling-vue-example](https://github.com/peregrine-cms/simple-sling-vue-example) project.

## Installation

To install slingpackager globally use

```
npm install @peregrinecms/slingpackager -g
```

This will make the packager available as a command line tool on your system. If you'd like to install `slingpackager` to your project only (or to try it before you commit to a global install), in your project folder, use

```
npm install @peregrinecms/slingpackager
```

You can then execute

```
npx slingpackager
```

to run slingpackager in your project.

## Supported Commands

```
slingpackager <command>

Commands:
  slingpackager delete <package>     delete package on server
  slingpackager install <package>    install package on server
  slingpackager list                 list installed packages
  slingpackager package <folder>     create a package
  slingpackager uninstall <package>  uninstall package on server
  slingpackager upload <package>     upload package to server

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
```

### List

```
slingpackager list

list installed packages

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
  ```

### Package

```
slingpackager package <folder>

create a package

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --verbose, -v  turn on verbose output
```

We expect a simple `slingpackager.config.js` file
in the folder where you execute the command that looks like this:

```
{
    "vault-properties": {
		"comment": "package comment",
		"entry": {
			"name": "package-name",
			"version": "VERSION",
			"group": "package-group-name"
		}
    }
}
```

### Upload

```
slingpackager upload <package>

upload package to server

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
  --install, -i  install the package after it's uploaded
```

### Install

```
slingpackager install <package>

install package on server

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
```

### Uninstall

```
slingpackager uninstall <package>

uninstall package on server

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
```

### Delete

```
slingpackager delete <package>

delete package on server

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --server, -s   server url                   [default: "http://localhost:8080"]
  --user, -u     server credentials in the form username:password
                                                        [default: "admin:admin"]
  --verbose, -v  turn on verbose output
```