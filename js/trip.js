var tripUserList = new Array();		
var tripItemList = new Array();
var preloadedTripItems = new Array("Gas", "Hotel", "Tickets", "Rentals");
var isNewTripItem = true; 

function tripItem(name, price)
{
	this.name = name; 
	this.price = price;
}

function removeUser(name, email, phone)
{
	for(var i = 0; i < tripUserList.length; i++)
	{
		if(name == tripUserList[i].name)
		{
			tripContactList.push(new person(name, email, phone));
			tripUserList.splice(i, 1);
			break;
		}
	}
	
	populateTripUserList();
}


function editTripItems(name, price)
{
	isNewTripItem = false;
	
	$('#trip-item-name-input').val(name);
	$('#trip-item-price-input').val(price);
	$('#trip-item-name-input').attr("disabled", true);
	$('#trip-item-dialog-input').dialog('open');
}

function linkTripItem(name, price)
{
	var contactHtml = ''; 
	
	tripUserList.sort(compareNames);
	
	/*
	for(var i = 0; i < tripContactList.length; i++)
	{
		contactHtml += '<li>' + tripContactList[i].name + '</li>'		
	}
	
	$('#trip-user-dialog-list ul').html(contactHtml);
	
	$('#trip-user-dialog-list li').click(function() {
		
		var selection = $(this).text();
		
		if(selection == "New User")
		{
			$('#trip-user-name-input').val('');
			$('#trip-user-email-input').val('');
			$('#trip-user-phone-input').val('');
		
			$('#trip-user-dialog-list').dialog('close');
			$('#trip-user-dialog-input').dialog('open');
		}
		else
		{
			for(var i = 0; i < tripContactList.length; i++)
			{
				var name = tripContactList[i].name; 
				var email = tripContactList[i].email; 
				var phone = tripContactList[i].pone; 
				
				if(name == selection)
				{
					tripUserList.push(new person(name, email, phone));
					tripContactList.splice(i, 1);
					populatetripUserList();
					
					break;
				}
			}
			
			$('#trip-user-dialog-list').dialog('close');
		}
	});
	
	$('#trip-user-dialog-list').dialog('open');
	$('#trip-user-label-button').click();
	*/
}


function populateTripUserList()
{
	var tripUserListHtml = "";
	
	tripUserList.sort(compareNames);
	for(var i = 0; i < tripUserList.length; i++)
	{
		var currName = tripUserList[i].name; 
		var currEmail = tripUserList[i].email; 
		var currPhone = tripUserList[i].phone;
		
		tripUserListHtml += '<div class="items-form"><button class="icon-button" onclick="removeUser(\'' + currName + 
				'\', \'' + currEmail + '\', \'' + currPhone + '\');">-</button>&nbsp;' + currName + '</div>'; 			
	}	
	
	$('#trip-user-list').html(tripUserListHtml);
	
	$('#trip-user-list button').button({
		icons: {
		    primary: "ui-icon-minus"
		  },
		  text: false
	});
}

function populateTripItemList()
{
	var tripItemListHtml = "";
	var potAmount = 0; 
	tripItemList.sort(compareNames);

	for(var i = 0; i < tripItemList.length; i++)
	{
		var currName = tripItemList[i].name; 
		var currPrice = tripItemList[i].price;
		
		potAmount += parseFloat(currPrice); 
		
		tripItemListHtml += '<div class="items-form">' + 
				'<span style="float:left;"><button class="icon-button" onclick="editTripItems(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
				'<button class="link-button" onclick="linkTripItem(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
						'' + currName + '</span>' + 
				'<span style="float:right;">$' + currPrice + '</span></div>' + 
				'<div class="clearDiv"></div>'; 
		
	}
	
	potAmount = Math.round(potAmount * 100) / 100;
	$('#tripPotInput').val('$' + potAmount);
	
	$('#trip-item-list').html(tripItemListHtml);
	$('#trip-item-list .icon-button').button({
		icons: {
		    primary: "ui-icon-wrench"
		},
		text: false
	});
	
	$('#trip-item-list .link-button').button({
		icons: {
		    primary: "ui-icon-person"
		  },
		  text: false
	});
}

function tripUserDialogListener() 
{
	$('#trip-user-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height: 400
	});
	
	$('#trip-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		height: 400,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#trip-user-name-input').val();
				var email = $('#trip-user-email-input').val();
				var phone = $('#trip-user-phone-input').val();
				
				var isNameFound = false; 
				
				for(var i = 0; i < tripUserList.length; i++)
				{
					if(name == tripUserList[i].name)
					{
						isNameFound = true;
						alert('User with that name already exists!');
						break;
					}
				}
				
				if(!isNameFound)
				{
					for(var i = 0; i < tripContactList.length; i++)
					{
						if(name == tripContactList[i].name )
						{
							isNameFound = true;
							alert('User with that name already exists!');
							break;
						}
					}
				}
				
				if(!isNameFound)
				{
					tripUserList.push(new person(name, email, phone));
					populateTripUserList();
				}
				
				$(this).dialog('close');
			} 
		}
	});

	$('#trip-user-add-button').click(function() {
		
		var contactHtml = '<li class="newSelector">New User</li>'; 
		
		tripContactList.sort(compareNames);
		for(var i = 0; i < tripContactList.length; i++)
		{
			contactHtml += '<li>' + tripContactList[i].name + '</li>'		
		}
		
		$('#trip-user-dialog-list ul').html(contactHtml);
		
		$('#trip-user-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New User")
			{
				$('#trip-user-name-input').val('');
				$('#trip-user-email-input').val('');
				$('#trip-user-phone-input').val('');
			
				$('#trip-user-dialog-list').dialog('close');
				$('#trip-user-dialog-input').dialog('open');
			}
			else
			{
				for(var i = 0; i < tripContactList.length; i++)
				{
					var name = tripContactList[i].name; 
					var email = tripContactList[i].email; 
					var phone = tripContactList[i].phone; 
					
					if(name == selection)
					{
						tripUserList.push(new person(name, email, phone));
						tripContactList.splice(i, 1);
						populateTripUserList();
						
						break;
					}
				}
				
				$('#trip-user-dialog-list').dialog('close');
			}
		});
		
		$('#trip-user-dialog-list').dialog('open');
		$('#trip-user-label-button').click();
	});

}

function tripItemDialogListener() 
{
	$('#trip-item-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height: 400
	});
	
	$('#trip-item-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		height: 400,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close');
			},
			"Delete": function() {
				var name = $('#trip-item-name-input').val();
				
				for(var i = 0; i < tripItemList.length; i++)
				{
					if(name == tripItemList[i].name)
					{
						tripItemList.splice(i, 1);
						preloadedTripItems.push(name);
						break;
					}
							
				}
				populateTripItemList();
				
				$(this).dialog('close');
			},
			"Add": function() {
				
				var name = $('#trip-item-name-input').val();
				var price = $('#trip-item-price-input').val();
				
				for(var i = 0; i < tripItemList.length; i++)
				{
					if(name == tripItemList[i].name)
					{
						if(isNewTripItem)
						{
							isNewTripItem = false;
							alert('You have already added a travel item with that name!');							
						}
						else
						{
							tripItemList[i].price = price;
						}
						break;
					}
							
				}
				
				if(!isNaN(price))
				{
					if(price == "")
						price = 0;
					
					if(isNewTripItem)
					{
						tripItemList.push(new bill(name, price));
						
						for(var i = 0; i < preloadedTripItems.length; i++)
						{
							if(preloadedTripItems[i] == name)
							{
								preloadedTripItems.splice(i, 1);
								break;
							}
						}
							
					}
					
					populateTripItemList();
					$(this).dialog('close');
				}
				else
				{
					alert('Please insert valid value for price');
				}
			} 
		}
	});

	$('#trip-item-add-button').click(function() {
		$('#trip-item-name-input').removeAttr("disabled");
		var tripItemListHtml = '<li class="newSelector">New Bill</li>';
		
		preloadedTripItems.sort();
		
		for(var i = 0; i < preloadedTripItems.length; i++)
		{
			tripItemListHtml += '<li>' + preloadedTripItems[i] + '</li>'		
		}
		
		
		$('#trip-item-dialog-list ul').html(tripItemListHtml);
		$('#trip-item-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			isNewTripItem = true;
			
			if(selection == "New Bill")
			{
				$('#trip-item-name-input').val('');
				$('#trip-item-price-input').val('');
			}
			else
			{
				$('#trip-item-name-input').val(selection)
				$('#trip-item-price-input').val('');
			}
			
			$('#trip-item-dialog-list').dialog('close');
			$('#trip-item-dialog-input').dialog('open');
		});
		
		$('#trip-item-dialog-list').dialog('open');
		$('#trip-item-label-button').click();
	});
}

function tripFormListener() {
	
	$('#trip-user-label-button').click(function() {
		$('#trip-item-list').hide('blind', 500);
		$('#trip-user-list').show('blind', 500);		
	});
	
	$('#trip-item-label-button').click(function() {
		$('#trip-user-list').hide('blind', 500);		
		$('#trip-item-list').show('blind', 500);
	});
	
	tripUserDialogListener();
	tripItemDialogListener();
	
	$('#tripPotInput').attr('disabled', true);
}
