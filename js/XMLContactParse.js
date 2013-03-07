var contactsList = new Array();

function xmlParse()
{
	
	$.ajax({
		type: "GET",
		url:"xml/contacts.xml",
		dataType: "xml",
		success: function(results) {
			contactsList = parseContact(results);
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