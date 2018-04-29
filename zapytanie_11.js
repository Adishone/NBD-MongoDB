db.people.aggregate( 
		[
			{ 
			$group : 
				{
					_id: "$sex",
					avgHeight: { $avg: "$height" },
					avgWeight: { $avg: "$weight" }
				}
			}
		]
	).forEach(printjson)
	
	
var mapFunction = function() {
					   var key = this.sex;
					   var value = { count: 1, weight: this.weight, height: this.height }
                       emit(key, value);
                   };
				   
var reduceFunction = function(sex, value) {
	reducedVal = { count: 0, weight: 0, height: 0 };
	for (var idx = 0; idx < value.length; idx++) {
		reducedVal.count += value[idx].count;
		reducedVal.weight += value[idx].weight;
		reducedVal.height += value[idx].height;
	}

    return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {
                       reducedVal.avgWeight = (reducedVal.weight/reducedVal.count);
					   reducedVal.avgHeight = (reducedVal.height/reducedVal.count);

                       return reducedVal;

                    };
					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "map_reduce_weight",
					    finalize: finalizeFunction
					 }
                   )
				   
db.map_reduce_weight.find({}, {"_id": 1, "value.avgHeight": 1, "value.avgWeight": 1}).forEach(printjson)				   
