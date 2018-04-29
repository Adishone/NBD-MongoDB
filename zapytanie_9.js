printjson(db.people.update( 
	{first_name: "Antonio"},
	{
		$set: { hobby : "ping-pong" }
	}, false, true
)
)