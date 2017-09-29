JENKINS CHECKSUM TOOL
=============================

used to help find checksum for windows deployments

## Installation
  you can install globally to use it in the jenkins execute node script plugin


  ```
  npm install -g jkchksum
  ```

  or include it in your own script


  ```
  npm install --save jkchksum
  ```

## Usage
  takes 2 arguments store|compare and a path. store is use to get he checksum before a deployment.
  compare is used to get the checksum after a deployment and compare to a previous checksum


  ```
  jkchksum store C:\\inetpub\\wwwroot\\myapplication.web
  ```

  output: checksum_results.json

  ```
  {
    "totalChkSum":1122120,
    "index.js":"4eb7a1573adbeabff3ffbcf1429709cfebbe46c3",
    "kmModel.js":"908034c509b8a8c05b8e5ff7fefa85f1296fa674"
  }
  ```

  after changes are made to your source file you can run the compare command to see which files have changed

  ```
  var __mysql = require('mysql');
  var __Promise = require('promise');
  //making comment for test
  ```

  ```
  jkchksum compare C:\\inetpub\\wwwroot\\myapplication.web
  ```

  output:

  ```
  {
    "totalChkSum":"1130480(<-)",
    "index.js":"566e7a266373db5a90e4668026dc74463ed4e5fe(<-)"
  }
  ```

  The output of the store command is a json file with a list of files names and a checksum for each file.
  However, the output of the compare command is a json file with a list of files where the checksum has changed. If the checksum has not changed since using the store command the file will not appear in the output file.

## Options
  Additional options can be specified in your config file.

  ```
  {
    //ignore is a list of regular expressions. the checksum will ignore any files that match expressions specified here
    "ignore":[
      "images",
      "Images",
      "[{a-z}]*\\.png",
      "bin",
      "[{a-zA-Z}]*\\.dll"
    ],
    //the output file name. if not specified default file name will be checksum_results.json
    "checksumFile":"build_checksum.json"
  }
 ```

## integration with jenkins
  runnning this module in jenkins is simple. First, make sure you have installed it globally.

  ```
  npm install -g jkchksum
  ```

  Then, you can run it in a windows batch file. In your batch file run the module. (test_jkchksum.bat)

  ```
  jkchksum store %WORKSPACE%
  ```

  In the jenkins build step select "Execute Windows batch command" and type the name of the your batch file.
  ```
  test_jkchksum.bat
  ```
