var contactsList;

function xmlParse()
{
	$.ajax({
		type: "GET",
		url:"contacts.xml",
		dataType: "xml",
		success: function(results) {
			contactsList = parseContact(results);
		},
		complete: function(){
			alert(contactsList[0].name);
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