var testrunner = require('qunit');

testrunner.options.log.tests = false;
testrunner.options.log.summary = false;
testrunner.options.log.globalSummary = false;
testrunner.options.log.assertions = false;

testrunner.run([{
    code: "Builder.js",
    tests: "BuilderTests.js"
},{
    code: "Index.js",
    tests: "IndexTests.js"
}]);

