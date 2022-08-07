
var Async = function () {

    self = this;

    this.map = function (array, func, callback) {
        // array = > images
        // func = downloadImage
        // callback => function anonyme
    
        var count = array.length;
        var errors = [];
        var results = [];
    
        for (i = 0, c = array.length ; i < c; i++) { 
            (function(i) {
                func (array[i], function (error, result) {
                    count--;
    
                    if (error) errors[i] = error; //  errors.push(error)
                    else results[i] = result;  //  results.push(result)
    
                    if (count < 1 ) return callback ((errors.length > 0) ? errors : null, results);
    
                } );
    
            })(i);
            
        }
    } 

    this.Waterfall = function () {

        // arguments : recupère les arguments dans une fonction ex: var func = function() {console.log (arguments); } func (1,2,3) => {'0':1, '1':2, '2':3}
    
        // precedente fonction sans resultat :
        // [0] jobs
        // [1] callback
    
        // precedente fonction avec resultat :
        // [0] jobs
        // [1] result  (de la precedente fonction)
        // [2] callback
    
        
        var jobs = arguments[0];
        var callback = (arguments.length > 2) ? arguments[2] : arguments[1];
    
    
        var job = jobs.shift();
    
        var after = function (error, result) {
            if (error) return callback(error);
            if (jobs.length < 1) return callback(null, result);
    
            var args = [];
            args.push(jobs); 
            if (result != undefined) args.push (result);
            args.push(function (error, result) {
                if (error) return callback (error);
                else return callback(null, result);
            });
    
            self.Waterfall.apply(this, args);
        }
    
        // sans precedent resultat
        // [0] callback
    
        // avec precedent resultat
        // [0] result // de la precedente fonction
        // [1] callback
    
        var args = [];
        if (arguments.length > 2) args.push(arguments[1]);
        args.push(after);
    
        job.apply(this, args); 
    
    };
};

module.exports = new Async();