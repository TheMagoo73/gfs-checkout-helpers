var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe('Shipping Options available on a given day', () => {
    it('Fails if no date is provided', () => {
        var parser = require('../gfs-checkout-helpers').optionsForGivenDate;

        return parser({}, '').should.be.rejected;
    });

    it('Fails if no Checkout response is provided', () => {
        var parser = require('../gfs-checkout-helpers').optionsForGivenDate;

        return parser({}, '2017-04-11T00:00:00').should.be.rejected;
    });

    it('Returns all options for a given date', () => {
        var resp = {
            nonDayDefinite: [
                {
                    deliveryDate: "2017-04-11T00:00:00"
                },
                {
                    deliveryDate: "2017-05-11T00:00:00"
                }
            ],
            dayDefinite: [
                {
                    deliveryDate: "2017-04-11T00:00:00"
                },
                {
                    deliveryDate: "2017-05-11T00:00:00"
                }
            ]
        }

        var parser = require('../gfs-checkout-helpers').optionsForGivenDate;

        return Promise.resolve(parser(resp, '2017-04-11T00:00:00')).should.eventually.have.length(2);
    });
});

describe('Provide services for a drop point', () => {
    it('Returns services for the selected drop point', () => {
        var dropPoint = {
            providerName: "DPD"
        }

        var checkoutResponse = {
            nonDayDefinite: [
                {
                    rates: [{
                        serviceType: {
                            type: "dmStandard"
                        }
                    }]
                }
            ],
            dayDefinite: [
                {
                    rates: [{
                        serviceType: {
                            type: "dmStandard"
                        }
                }]
                },
                {
                    rates: [{
                        serviceType: {
                            type: "dmStandardDropPoint",
                            droppointProviders: [
                                {name: "DPD"}
                            ]
                        }
                    }]
                },
                {
                    rates: [{
                        serviceType: {
                            type: "dmStandardDropPoint",
                            droppointProviders: [
                                {name: "DPD"},
                                {name: "COLLECT PLUS"}
                            ]
                        }
                    }]
                },
                {
                    rates: [{
                        serviceType: {
                            type: "dmStandardDropPoint",
                            droppointProviders: [
                                {name: "COLLECT PLUS"}
                            ]
                        }
                    }]
                }
            ]
        }

        var parser = require('../gfs-checkout-helpers').optionsForDropPoint;

        return Promise.resolve(parser(checkoutResponse, dropPoint)).should.eventually.have.length(2);
    });
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

    it('Returns drop points for a given option', () => {
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