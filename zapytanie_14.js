db.people.aggregate( 
		[
			{ 
			$group : 
				{
					_id: "$nationality",
					avgBMI: { $avg: {$pow: [{$divide: ["$weight", "$height"]}, 2]} },
					minBMI: { $min: {$pow: [{$divide: ["$weight", "$height"]}, 2]} },
					maxBMI: { $max: {$pow: [{$divide: ["$weight", "$height"]}, 2]} }
				}
			}
		]
	).forEach(printjson)
	
	printjson("==============================")
	
var mapFunction = function() {
					   var key = this.nationality;
					   var value = { count: 1, bmi: Math.pow((this.weight/this.height), 2)};
                       emit(key, value);
                   };
				   
var reduceFunction = function(nationality, value) {
	var avgBmi = 0.0;
	reducedVal = { count: 0, avgBMI: avgBmi, minBMI : 1, maxBMI: 0 };
	for (var idx = 0; idx < value.length; idx++) {
		if (value[idx].bmi) {
			reducedVal.avgBMI += value[idx].bmi;
			reducedVal.count += value[idx].count;
		}
		if (reducedVal.minBMI > value[idx].bmi)
			reducedVal.minBMI = value[idx].bmi;
		if (reducedVal.maxBMI < value[idx].bmi)
			reducedVal.maxBMI = value[idx].bmi;
	}

    return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {
                       reducedVal.avgBMI = (reducedVal.avgBMI/reducedVal.count);

                       return reducedVal;

                    };
					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "map_reduce_bmi",
						finalize: finalizeFunction
					 }
                   )
				   
db.map_reduce_bmi.find({}, {"_id": 1, "value.avgBMI" : 1, "value.minBMI" : 1, "value.maxBMI": 1, "value.count" : 1}).forEach(printjson)				   
