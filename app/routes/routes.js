var cc = require('npm-currency-converter')
var transactions = require('../data/transactions.js');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/paypal/activity');
  })

  /* === DISPLAY TRANSACTION HISTORY === */
  app.get('/paypal/activity', function (req, res) {
    res.render('transactions', transactions)
  });

  /* input: Amount, the currency code for the amount, 
   * the currency code it needs to be converted to
   *
   * returns: the amount, the currency code for the amount, 
   * the currency symbol */
  app.post('/paypal/currencyConversion', function (req, res) {
    var input = {};
    input.amount      = req.body.amount;
    input.convertFrom = req.body.convertFrom;
    input.convertTo   = req.body.convertTo;


    cc.convert(input)
      .then(function (convertedCurrency) {
        console.log(convertedCurrency);
        res.send(200, convertedCurrency);
      })
      .catch(function (err) {
        // The server encountered an unexpected condition which prevented it from fulfilling the request.
        res.send(500, "Error converting currency");
      });
  });

  /* input: CurrencyCode to convert from, Currency code to convert to 
   *
   * returns: the conversion rate */
  app.post('/paypal/conversionRate', function (req, res) {
    var input = {};
    input.convertFrom = req.body.convertFrom;
    input.convertTo   = req.body.convertTo;

    cc.rates(input)
      .then(function (convertedRates) {
        res.send(200, convertedRates);
      })
      .catch(function (err) {
        res.send(500, "Error calculating conversion rate.");
      });
  });

  /* ==== REDIRECT WILDCARDS ==== */
  app.get('*', function (req, res) {
    res.redirect('/paypal/activity');
  });

};