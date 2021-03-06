require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gfs-checkout-helpers":[function(require,module,exports){
function _findDroppointsForProvider(checkoutResponse, provider){
    return new Promise(function(resolve, reject){

        if(!checkoutResponse.droppoints){
            reject("No drop points available in checkoutResponse");
        }

        if(!provider || provider === ""){
            reject("No provider specified");
        }

        var droppoints = [];

        checkoutResponse.droppoints.forEach((point) => {
            if(point.providerName == provider){
                droppoints.push(point);
            }
        });

        resolve(droppoints);
    });
}

function _findOptionsForDate(options, date){
    return new Promise(function(resolve, reject){
        var result = {
            type: "",
            options: []
        };

        if(!options) {
            resolve(result);
        }

        options.forEach((day) => {
            if(day.deliveryDate === date){
                result.options.concat(day.rates);
            }
        });

        resolve(result);
    });
}

function _findOptionsForDropPoint(options, dropPoint, date){
    return new Promise(function(resolve, reject){
        var result = [];
        if(!options) {
            resolve(result);
        }

        options.forEach((day) => {
            if(date == "" || day.deliveryDate == date) {
                day.rates.forEach((option) => {
                    if(option.serviceType.type == "dmStandardDropPoint") {
                        option.serviceType.droppointProviders.forEach((provider) => {
                            if(provider.name == dropPoint.providerName) {
                                result.push(option);
                            }
                        });
                    }
                });
            }
        });

        resolve(result);
    });
}

function _isDayDef(minDD, maxDD){
    return minDD == maxDD;
}

module.exports = {
    optionsForGivenDate: function(checkoutResponse, date){
        return new Promise(function(resolve, reject){

            if(date == ''){
                reject("No date specified");
            }

            if(Object.keys(checkoutResponse).length == 0){
                reject("No Checkout data provided");
            }

            var promises = [];
            
            promises.push(_findOptionsForDate(checkoutResponse.dayDefinite, date));
            promises.push(_findOptionsForDate(checkoutResponse.nonDayDefinite, date));

            Promise.all(promises).then((options)=> {
                resolve([].concat.apply([], options));
            }, (reason) => {
                reject(reason);
            });

        });
    },
    droppointsForOption: function(checkoutResponse, option){
        return new Promise(function(resolve, reject){

            if(option.serviceType.type != "dmStandardDropPoint"){
                reject("Non Drop Point service");
            }

            var promises = [];

            option.serviceType.droppointProviders.forEach((provider) => {
                promises.push(_findDroppointsForProvider(checkoutResponse, provider.name));
            });

            Promise.all(promises).then((points) => {
                resolve([].concat.apply([], points));
            }, (reason) => {
                reject(reason);
            });
        });
    },
    optionsForDropPoint: function(checkoutResponse, dropPoint, date){
        return new Promise(function(resolve, reject){

            var promises = [];
            
            promises.push(_findOptionsForDropPoint(checkoutResponse.nonDayDefinite, dropPoint, date));
            promises.push(_findOptionsForDropPoint(checkoutResponse.dayDefinite, dropPoint, date));

            Promise.all(promises).then((options) => {
                resolve([].concat.apply([], options));
            }, (reason) => {
                reject(reason);
            });
        });
    }
};
},{}]},{},["gfs-checkout-helpers"]);
