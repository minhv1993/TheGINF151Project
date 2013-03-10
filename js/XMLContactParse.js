var foodContactList = new Array();
var rentContactList = new Array();
var tripContactList = new Array();

function xmlParse()
{
	var contactsList = new Array();
	
	$.ajax({
		type: "GET",
		url:"xml/contacts.xml",
		dataType: "xml",
		success: function(results) {
			foodContactList = parseContact(results);
			rentContactList = foodContactList; 
			tripContactList = foodContactList;
		}, 
		complete: function() {
		}
	});
}

function parseContact(filename)
{
	var contactList = new Array();

	$(filename).find("contacts").each(function()
	{
		$(this).find('contact').each(function(){
			var name = $(this).find('name').text();  		
			var phone = $(this).find('phone').text();  		
			var email = $(this).find('email').text();  		

			var tempPerson = new person(name, phone, email);

			contactList.push(tempPerson);
		});
	});

	return contactList;
}

function compareNames(a,b) {
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}
