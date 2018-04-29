	db.people.aggregate( 
		[
			{ $match: { nationality: "Poland"} },
			{ $unwind : "$credit"},
			{ $group: {
				"_id": "$credit.currency",
				"totalAmount": {$sum: "$credit.balance"},
				"avgAmount": {$avg: "$credit.balance"}
			}}
		]
	).forEach(printjson)
	
	printjson("==============================")
	
	var mapFunction = function() {
		if (this.nationality == "Poland")
		{
					   this.credit.forEach(function (credit)
					   {
						   emit(credit.currency, credit.balance);
					   });
		}
                   };
				   
var reduceFunction = function(currency, balance) {
	reducedVal = { count: 0, totalBalance: 0.0, avgBalance: 0.0 };
	for (var idx = 0; idx < balance.length; idx++) {
		if (!isNaN(balance[idx]))
		{
		reducedVal.count++;
		reducedVal.totalBalance += balance[idx];
		reducedVal.avgBalance += balance[idx];
		}
	}

    return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {
                       reducedVal.avgBalance = (reducedVal.avgBalance/reducedVal.count);

                       return reducedVal;

                    };

					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "map_reduce_polish_balance"
					 }
                   )
				   
db.map_reduce_polish_balance.find({}, {"_id": 1, "value.totalBalance": 1, "value.avgBalance" : 1}).forEach(printjson)