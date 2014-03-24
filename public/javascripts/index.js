var Politician = Backbone.Model.extend({
	defaults: {
		fname: "Lorem",
		lname: "Ipsum",
		birthDate: "01/01/2014",
		politicalParty: "Independent",
		almaMater: "University of Missouri",
		gender: "Male",
		religion: "Athiest",
		Married: "No",
		Ethnicity:"Caucasian",
		hasChild: false
	}
});

var House = Politician.extend({
	defaults: {
		stateCode: "MO",
		districtNumber: 00,
		startDate: "01/01/2014",
		endDate: "01/01/2014",
		position: "House WHIP"
	}

});

var Senate = Politician.extend({
	defaults: {
		stateCode: "MO",
		startDate: "01/01/2014",
		endDate: "01/01/2014",
		position: "President pro tempore"
	}
});

var Committee = Backbone.Model.extend({
	defaults: {
		committee_name: "Education Financial Budget",
		type: "Special",
		category: "Economic",
		isSub: false,
		dateEstablished: "01/01/2014",
		endDate: "NULL"
	}
})