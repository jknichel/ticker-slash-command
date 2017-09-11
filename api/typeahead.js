var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  // If term is empty, prompt user to enter a value.
  if (!term) {
    res.json([{
      title: '<i>(enter ticker)</i>',
      text: ''
    }]);
    return;
  }

  // Create object holding the info for grabbing our ticker typeahead suggestions from the xignite API.
  var options = {
    uri: 'http://search.xignite.com/Search/Suggest',
    qs: {
      parameter: 'XigniteFinancials.GetCompanyBalanceSheet.Identifier',
      term
    },
    json: true
  };

  request(options, function (error, response, body) {
    // If the request doesn't have success status, or the body is missing there was an error.
    if (error || response.statusCode !== 200 || !body) {
      res.status(500).send('Error');
      return;
    }

    // Chain the results together and map the values we're interested in to the relevant fields.
    var results = _.chain(body.Results)
      .map(function(result) {
        return {
          title: '<div>' + result.Value + ' - ' + result.Text + '</div>',
          text: result.Value
        }
      })
      .value()

      // If we have no results tell the user there was no match.
      if (body.Results.length === 0) {
        res.json([{
          title: '<i>(No matching tickers found)<i>',
          text: ''
        }]);
        return;
      }

    // Add the results to the response.
    res.json(results);
  });

};
