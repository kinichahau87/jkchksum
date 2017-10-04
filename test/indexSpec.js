var jkchksumObj = require('../lib/index.js');
var fs = require('fs');
var expect = require('chai').expect;
var assert = require('chai').assert;
var promise = require('promise');

describe('A checksum tool', function(){
  //setup wait for each test
  beforeEach(function(done){
    setTimeout(function(){
      done();
    }, 1000);
  });

  //test storing original source code checksum
  it('should store source checksum', function(done){
    var lGLobalPathOriginal = './test/testSource';
    var lCommand = 'store';
    var storePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          resolve();
        }, 100);
    });

    storePromise.then(results => {
      var resultStream = fs.readFileSync('build_checksum.json');
      var resultJson = JSON.parse(resultStream.toString());

      expect(resultJson.hasOwnProperty('totalChkSum')).to.equal(true);

      expect(resultJson.totalChkSum).to.not.equal(0);

      expect(resultJson.hasOwnProperty('mockSourceLevel1.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel1a.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel2.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel3.js')).to.equal(true);
      //done with test
      done();
    });
  });

  it('should compare none altered source', function(done){
    //use not alter source code
    var lGLobalPathOriginal = './test/testSourceNotAlt';
    var lCommand = 'compare';
    var comparePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          resolve();
        }, 100);
    });

    comparePromise.then(results => {
      var resultStream = fs.readFileSync('build_checksum.json');
      var resultJson = JSON.parse(resultStream.toString());

      expect(resultJson.hasOwnProperty('totalChkSum')).to.equal(true);

      expect(resultJson.totalChkSum).to.not.equal(0);

      expect(resultJson.hasOwnProperty('mockSourceLevel1.js')).to.equal(false);

      expect(resultJson.hasOwnProperty('mockSourceLevel1a.js')).to.equal(false);

      expect(resultJson.hasOwnProperty('mockSourceLevel2.js')).to.equal(false);

      expect(resultJson.hasOwnProperty('mockSourceLevel3.js')).to.equal(false);

      //done with test
      done();
    });
  });

  //test storing original source code checksum
  it('should store source checksum agian', function(done){
    var lGLobalPathOriginal = './test/testSource';
    var lCommand = 'store';
    var storePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          resolve();
        }, 100);
    });

    storePromise.then(results => {
      var resultStream = fs.readFileSync('build_checksum.json');
      var resultJson = JSON.parse(resultStream.toString());

      expect(resultJson.hasOwnProperty('totalChkSum')).to.equal(true);

      expect(resultJson.totalChkSum).to.not.equal(0);

      expect(resultJson.hasOwnProperty('mockSourceLevel1.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel1a.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel2.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel3.js')).to.equal(true);
      //done with test
      done();
    });
  });

  it('should compare altered source', function(done){
    //use not alter source code
    var lGLobalPathOriginal = './test/testSourceAlt';
    var lCommand = 'compare';
    var comparePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          resolve();
        }, 100);
    });

    comparePromise.then(results => {
      var resultStream = fs.readFileSync('build_checksum.json');
      var resultJson = JSON.parse(resultStream.toString());

      expect(resultJson.hasOwnProperty('totalChkSum')).to.equal(true);

      expect(resultJson.totalChkSum).to.not.equal(0);

      expect(resultJson.hasOwnProperty('mockSourceLevel1.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel1a.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel2.js')).to.equal(true);

      expect(resultJson.hasOwnProperty('mockSourceLevel3.js')).to.equal(true);

      //done with test
      done();
    });
  });

  it('should throw exception for invalid command', function(done){
    var lGLobalPathOriginal = './test/testSourceAlt';
    var lCommand = 'doentWork';
    try {
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        assert.fail(0,1,'exception not thrown');
    } catch (err){
      expect(err).to.equal('command not supported:' + lCommand);
    }

    done();
  });

  it('should throw exception for invalid path store', function(done){
    var lGLobalPathOriginal = './dontwork';
    var lCommand = 'store';

    var storePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          reject("error");
        }, 100);
    });

      storePromise.then(results => {
        //should not go here
          assert.fail(0,1,'exception not thrown');
      }).catch(err => {
        done();
      });
  });

  it('should throw exception for invalid path compare', function(done){
    var lGLobalPathOriginal = './dontwork';
    var lCommand = 'compare';

    var comparePromise = new promise(function(resolve, reject){
        jkchksumObj.jkchksum(lCommand, lGLobalPathOriginal);
        setTimeout(function(){
          reject("error");
        }, 100);
    });

      comparePromise.then(results => {
        //should not go here
        assert.fail(0,1,'exception not thrown');
      }).catch(err => {
        done();
      });
  });


  afterEach(function(done){
    setTimeout(function(){
      done();
    }, 1000);
  });
});
