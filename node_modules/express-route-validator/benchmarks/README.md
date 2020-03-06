# Benchmarks

The purpose of this folder is to compare performance on various approaches to handling route validation, compare syntax to the various approaches, and allow developers to easily test the performance implications of adding new features. **NOTE:** The `perf_test.js` does not do rigorous performance testing, so take the results with a grain of salt.

## results.json

See `results.json` for most recent results from performance tests.

## Comparisons

* *server_base.js*: Uses `express-route-validator`
* *server_no_validation.js*: NO validation
* *server_express_validation.js*: Uses `express-validation` (todo)
* *server_express_validator.js*: Uses `express-validator` (todo)