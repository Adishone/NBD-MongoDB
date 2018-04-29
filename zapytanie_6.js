printjson(db.people.insert(
{
	"sex" : "Male",
	"first_name" : "Adrian",
	"last_name" : "Nakonieczny",
	"job" : "Junior .NET Developer",
	"email" : "s10510@pja.edu.pl",
	"location" : {
		"city" : "Warsaw",
		"address" : {
			"streetname" : "Blue Dragon",
			"streetnumber" : "1337"
		}
	},
	"description" : "condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque",
	"height" : "179.51",
	"weight" : "104.2",
	"birth_date" : "1992-06-27T18:22:07Z",
	"nationality" : "Poland",
	"credit" : [
		{
			"type" : "jcb",
			"number" : "1234123412341234",
			"currency" : "PLN",
			"balance" : "9999"
		}
	]
}
)
)