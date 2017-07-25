module.exports = {
    optionsForGivenDate : function(checkoutResponse, date){
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

            if(1 == 0){
                resolve(droppoints = {awesome: "it all worked"});
            }
            else{
                reject(error = {bugger: "it went wrong"});
            }
        });
    }
}