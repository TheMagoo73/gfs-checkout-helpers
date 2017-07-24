module.exports = {
    optionsForGivenDate : function(options, date){
        return new Promise(function(resolve, reject){

            if(1 == 0){
                resolve(options = {awesome: "it all worked"});
            }
            else{
                reject(error = {bugger: "it went wrong"});
            }

        });
    }
}