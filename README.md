JENKINS CHECKSUM TOOL
=============================

used to help find checksum for windows deployments

## Installation
  you can install globally to use it in the jenkins execute node script plugin
  `npm install -g jkchksum`

  or include it in your own script
  `npm install --save jkchksum`

## Usage
  takes 2 arguments store|compare and path. store is use to get he checksum before a deployment.
  compare is used to get the checksum after a deployment and compare to a previous checksum
  `jkchksum store C:\\inetpub\\wwwroot\\myapplication.web`

  `jkchksum compare C:\\inetpub\\wwwroot\\myapplication.web`
