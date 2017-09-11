var request = require('request');
var _ = require('underscore');
var trading_view_module = require('../utils/trading_view_html');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  handleTickerString(term, req, res);
};

function handleTickerString(ticker, req, res) {
  var html = trading_view_module(ticker).replace(/\r?\n|\r/g, ' ');

  res.json({
    body: html
  });
}
