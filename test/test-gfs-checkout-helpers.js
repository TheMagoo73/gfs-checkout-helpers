var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;
chai.should();

it('Can return all options for a given date', () => {

    var parser = require('../gfs-checkout-helpers').optionsForGivenDate;

    return parser('', '').should.be.fulfilled;

});