'use strict';
const expect = require('must');
const httpRequest = require('request');
const port = 5001;
const baseUri = 'http://localhost:' + port;

const app = require('../server/server');

describe('Retroflection server', function () {
  beforeEach((done) => {
    app.start(port, done);
  });

  afterEach((done) => {
    app.stop(done);
  });

  it('responds on a GET for the standard home page indicating appcaching', (done) => {
    httpRequest({uri: baseUri}, (req, resp) => {
      expect(resp).to.exist();
      expect(resp.statusCode).to.equal(200);
      expect(resp.body).to.contain('<body><div id="retroflection"></div><script src="/js/global.js"></script></body>');
      expect(resp.body).to.contain('<html manifest="retroflection.appcache">');
      done(); // without error check
    });
  });

  it('serves the app no matter what URL', (done) => {
    httpRequest({uri: baseUri + '/somethingWeird'}, (req, resp) => {
      expect(resp).to.exist();
      expect(resp.statusCode).to.equal(200);
      expect(resp.body).to.contain('<body><div id="retroflection"></div><script src="/js/global.js"></script></body>');
      expect(resp.body).to.contain('<html manifest="retroflection.appcache">');
      done(); // without error check
    });
  });

  it('responds on a GET for the online home page indicating NO appcaching', (done) => {
    httpRequest({uri: baseUri + '/online'}, (req, resp) => {
      expect(resp).to.exist();
      expect(resp.statusCode).to.equal(200);
      expect(resp.body).to.contain('<body><div id="retroflection"></div><script src="/js/global.js"></script></body>');
      expect(resp.body).to.contain('<html>');
      done(); // without error check
    });
  });

  it('serves the online app no matter what suffix', (done) => {
    httpRequest({uri: baseUri + '/online/somethingWeird'}, (req, resp) => {
      expect(resp).to.exist();
      expect(resp.statusCode).to.equal(200);
      expect(resp.body).to.contain('<body><div id="retroflection"></div><script src="/js/global.js"></script></body>');
      expect(resp.body).to.contain('<html>');
      done(); // without error check
    });
  });

});
