Sling Packager
==============

Sling Packager is a content packaging and deployment tool for front end developers. It can be used to package and deploy content to Adobe Experience Manager/AEM or standalone Apache Sling server with Composum. All you need is NodeJs and npm. There is no dependency on Maven or Java.

Install
------------
```
npm install -g slingpackager
```

Available Commands
------------------

To get a list of available commands:
```
slingpackager --help
```

To display command specific help:
```
slingpackager <command> --help
```

Package Configuration
---------------------

Bellow is an example of minimal configuration required for package generation using ```package``` command. 

```
{
    "vault-properties": {
		"comment": "myapp - UI Apps",
		"entry": {
			"name": "ui.apps",
			"version": "1.0-SNAPSHOT",
			"group": "myapp"
		}
    }
}
```

This should be placed in the file named _slingpackager.config.js_ anywhere in the folder path passed to this command (we suggest project's root folder). Or path to configuration file can be specified via --config option. 

The above example will result in a package file named ui.apps-1.0-SNAPSHOT.zip with the fillowing properties.xml file inside it's META/vault folder.

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
  <comment>myapp - UI Apps</comment>
  <entry key="name">ui.apps</entry>
  <entry key="version">1.0-SNAPSHOT</entry>
  <entry key="group">themeclean-flex</entry>
  <entry key="createdBy">slingpackager</entry>
  <entry key="acHandling">IGNORE</entry>
  <entry key="allowIndexDefinitions">false</entry>
  <entry key="requiresRoot">false</entry>
  <entry key="path">/etc/packages/myapp/ui.apps-1.0-SNAPSHOT.zip</entry>
</properties>
```

Examples
--------

Create a package.
```
slingpackager package /pathToMyProject/pathToPackageContent
```

Upload package to server.
```
slingpackager upload <path to package file>
```

Upload package to server and install it.
```
slingpackager upload <path to package file> -i
```

Upload package to local AEM Author on port 4502 as user admin:somePassword.
```
slingpackager upload <path to package file> -u admin:somePassword -s http://localhost:4502
```

List packages on the server.
```
slingpackager list
```

List packages on the server on AEM Author on port 4502.
```
slingpackager list -s http://localhost:4502
```

Install uploaded package.
```
slingpackager install <path from list command>
```

Uninstall package.
```
slingpackager uninstall <path from list command>
```

Delete package.
```
slingpackager delete <path from list command>
```