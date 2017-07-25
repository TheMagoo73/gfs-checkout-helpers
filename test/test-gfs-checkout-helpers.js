var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

it('Can return all options for a given date', () => {

    var parser = require('../gfs-checkout-helpers').optionsForGivenDate;

    return parser('', '').should.be.fulfilled;

});

describe('Drop Points for a given shipping Option', () => {
    it('Rejects non-drop point shipping Options', () => {
        var option = {
            serviceType: {
                type: "dmStandard"
            }    
        }

        var parser = require('../gfs-checkout-helpers').droppointsForOption;

        return  Promise.resolve(parser({}, option)).should.be.rejected;

    });

    it('Can return drop points for a given option', () => {
        var response = {
            droppoints: [
                {
                    providerName: "DPD"
                },
                {
                    providerName: "COLLECT PLUS"
                },
                {
                    providerName: "HERMES"
                }
            ]
        };

        var option = {
            serviceType: {
                type: "dmStandardDropPoint",
                droppointProviders: [
                    {
                        name: "DPD"
                    },
                    {
                        name: "COLLECT PLUS"
                    }
                ]
            }    
        }

        var parser = require('../gfs-checkout-helpers').droppointsForOption;

        return  Promise.resolve(parser(response, option)).should.eventually.have.length(2);
    });
});