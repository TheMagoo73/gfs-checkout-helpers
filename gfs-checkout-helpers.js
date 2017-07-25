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
        })

        resolve(droppoints);
    });
}

module.exports = {
    optionsForGivenDate: function(checkoutResponse, date){
        return new Promise(function(resolve, reject){

            if(1 == 0){
                resolve(options = {awesome: "it all worked"});
            }
            else{
                reject(error = {bugger: "it went wrong"});
            }

        });
    },
    droppointsForOption: function(checkoutResponse, option){
        return new Promise(function(resolve, reject){

            if(option.serviceType.type != "dmStandardDropPoint"){
                reject("Non Drop Point service")
            }

            var promises = [];

            option.serviceType.droppointProviders.forEach((provider) => {
                promises.push(_findDroppointsForProvider(checkoutResponse, provider.name));
            })

            Promise.all(promises).then((points) => {
                resolve([].concat.apply([], points));
            }, (reason) => {
                reject(reason);
            })
        });
    }
}