var travelUserList = new Array();		
var travelItemList = new Array();
var preloadedTravelItems = new Array("Gas", "Hotel", "Tickets", "Rentals");
var isNewTravelItem = true; 

function travelItem(name, price, personList)
{
	this.name = name; 
	this.price = price;
	this.personList = personList;
}

function removeUser(name, email, phone)
{
	for(var i = 0; i < travelUserList.length; i++)
	{
		if(name == travelUserList[i].name)
		{
			travelContactList.push(new person(name, email, phone));
			travelUserList.splice(i, 1);
			break;
		}
	}
	
	for(var i = 0; i < travelItemList.length; i++)
	{
		for(var j = 0; j < travelItemList[i].personList.length; j++)
		{
			if(name == travelItemList[i].personList[j].name)
			{
				travelItemList[i].personList.splice(j, 1);
				break;
			}
		}
	}
	
	populateTravelUserList();
	populateTravelItemList();
}


function editTravelItems(name, price)
{
	isNewTravelItem = false;
	
	$('#travel-item-name-input').val(name);
	$('#travel-item-price-input').val(price);
	$('#travel-item-name-input').attr("disabled", true);
	$('#travel-item-dialog-input').dialog('open');
}

function linkTravelItem(name, price)
{
	var travelUserListHtml = ''; 
	travelUserList.sort(compareNames);
	
	//travelItemMap.push(new travelItemMap(name, price, new Array()));
		
	var currUserList = new Array();
	
	//Obtains list of people linked to this item
	for(var i = 0; i < travelItemList.length; i++)
	{
		if(travelItemList[i].name == name)
			currUserList = travelItemList[i].personList;
	}
	
	//check boxes of those users with a link
	for(var i = 0; i < travelUserList.length; i++)
	{
		var currName = travelUserList[i].name;
		var isNameFound = false; 
		
		for(var j = 0; j < currUserList.length; j++)
		{
			if(currUserList[j].name == currName)
			{	
				isNameFound = true;
				break;
			}
		}
		
		if(!isNameFound)
		{
			travelUserListHtml += '<input type="checkbox" name="travelUser" value="' 
				+ currName + '" class="checkbox">' + currName + '<br/>'
		}
		else
		{
			travelUserListHtml += '<input type="checkbox" name="travelUser" value="' + 
				currName + '" class="checkbox" checked="true">' + currName + '<br/>'
		}
	}
	
	$('#travel-user-dialog-link').dialog("option", "title", name);
	$('#travel-user-dialog-link').html(travelUserListHtml);
	$('#travel-user-dialog-link').dialog('open');
}


function populateTravelUserList()
{
	var travelUserListHtml = "";
	
	travelUserList.sort(compareNames);
	for(var i = 0; i < travelUserList.length; i++)
	{
		var currName = travelUserList[i].name; 
		var currEmail = travelUserList[i].email; 
		var currPhone = travelUserList[i].phone;
		
		travelUserListHtml += '<div class="items-form"><button class="icon-button" onclick="removeUser(\'' + currName + 
				'\', \'' + currEmail + '\', \'' + currPhone + '\');">-</button>&nbsp;' + currName + '</div>'; 			
	}	
	
	$('#travel-user-list').html(travelUserListHtml);
	
	$('#travel-user-list button').button({
		icons: {
		    primary: "ui-icon-minus"
		  },
		  text: false
	});
}

function populateTravelItemList()
{
	var travelItemListHtml = "";
	var potAmount = 0; 
	travelItemList.sort(compareNames);

	for(var i = 0; i < travelItemList.length; i++)
	{
		var currName = travelItemList[i].name; 
		var currPrice = travelItemList[i].price;
		
		potAmount += parseFloat(currPrice); 
		
		travelItemListHtml += '<div class="items-form">' + 
				'<div style="float:left;"><button class="icon-button" onclick="editTravelItems(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
				'<button class="link-button" onclick="linkTravelItem(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;</div>' + 
						'<div style="float:left;">' + currName + '<br/>' + 
							'<span class="small-info-text">';
				
		for(var j = 0; j < travelItemList[i].personList.length; j++)
		{
			var currPersonName = travelItemList[i].personList[j].name; 
			travelItemListHtml += '[' + currPersonName + ']';
		}
						
		travelItemListHtml +='</span></div>' + 
				'<span style="float:right;">$' + currPrice + '</span></div>' + 
				'<div class="clearDiv"></div>'; 
		
	}
	
	potAmount = Math.round(potAmount * 100) / 100;
	$('#travelPotInput').val(potAmount);
	
	$('#travel-item-list').html(travelItemListHtml);
	$('#travel-item-list .icon-button').button({
		icons: {
		    primary: "ui-icon-wrench"
		},
		text: false
	});
	
	$('#travel-item-list .link-button').button({
		icons: {
		    primary: "ui-icon-person"
		  },
		  text: false
	});
}

function travelUserDialogListener() 
{
	$('#travel-user-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#travel-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		width: dialogWidth, 
		height: dialogHeight,
		modal: true,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#travel-user-name-input').val();
				var email = $('#travel-user-email-input').val();
				var phone = $('#travel-user-phone-input').val();
				
				var isNameFound = false; 
				
				for(var i = 0; i < travelUserList.length; i++)
				{
					if(name == travelUserList[i].name)
					{
						isNameFound = true;
						alert('User with that name already exists!');
						break;
					}
				}
				
				if(!isNameFound)
				{
					for(var i = 0; i < travelContactList.length; i++)
					{
						if(name == travelContactList[i].name )
						{
							isNameFound = true;
							alert('User with that name already exists!');
							break;
						}
					}
				}
				
				if(!isNameFound)
				{
					travelUserList.push(new person(name, email, phone));
					populateTravelUserList();
				}
				
				$(this).dialog('close');
			} 
		}
	});

	$('#travel-user-add-button').click(function() {
		
		var contactHtml = '<li class="newSelector">New User</li>'; 
		
		travelContactList.sort(compareNames);
		for(var i = 0; i < travelContactList.length; i++)
		{
			contactHtml += '<li>' + travelContactList[i].name + '</li>'		
		}
		
		$('#travel-user-dialog-list ul').html(contactHtml);
		
		$('#travel-user-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New User")
			{
				$('#travel-user-name-input').val('');
				$('#travel-user-email-input').val('');
				$('#travel-user-phone-input').val('');
			
				$('#travel-user-dialog-list').dialog('close');
				$('#travel-user-dialog-input').dialog('open');
			}
			else
			{
				for(var i = 0; i < travelContactList.length; i++)
				{
					var name = travelContactList[i].name; 
					var email = travelContactList[i].email; 
					var phone = travelContactList[i].phone; 
					
					if(name == selection)
					{
						travelUserList.push(new person(name, email, phone));
						travelContactList.splice(i, 1);
						populateTravelUserList();
						
						break;
					}
				}
				
				$('#travel-user-dialog-list').dialog('close');
			}
		});
		
		$('#travel-user-dialog-list').dialog('open');
		$('#travel-user-label-button').click();
	});

}

function travelItemDialogListener() 
{
	$('#travel-item-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#travel-item-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		width: dialogWidth, 
		height: dialogHeight,
		modal: true,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close');
			},
			"Delete": function() {
				var name = $('#travel-item-name-input').val();
				
				for(var i = 0; i < travelItemList.length; i++)
				{
					if(name == travelItemList[i].name)
					{
						travelItemList.splice(i, 1);
						preloadedTravelItems.push(name);
						break;
					}
							
				}
				populateTravelItemList();
				
				$(this).dialog('close');
			},
			"Add": function() {
				
				var name = $('#travel-item-name-input').val();
				var price = $('#travel-item-price-input').val();
				
				for(var i = 0; i < travelItemList.length; i++)
				{
					if(name == travelItemList[i].name)
					{
						if(isNewTravelItem)
						{
							isNewTravelItem = false;
							alert('You have already added a travel item with that name!');							
						}
						else
						{
							travelItemList[i].price = price;
						}
						break;
					}
							
				}
				
				if(!isNaN(price))
				{
					if(price == "")
						price = 0;
					
					if(isNewTravelItem)
					{
						travelItemList.push(new travelItem(name, price, new Array()));
						
						for(var i = 0; i < preloadedTravelItems.length; i++)
						{
							if(preloadedTravelItems[i] == name)
							{
								preloadedTravelItems.splice(i, 1);
								break;
							}
						}
							
					}
					
					populateTravelItemList();
					$(this).dialog('close');
				}
				else
				{
					alert('Please insert valid value for price');
				}
			} 
		}
	});

	$('#travel-item-add-button').click(function() {
		$('#travel-item-name-input').removeAttr("disabled");
		var travelItemListHtml = '<li class="newSelector">New Bill</li>';
		
		preloadedTravelItems.sort();
		
		for(var i = 0; i < preloadedTravelItems.length; i++)
		{
			travelItemListHtml += '<li>' + preloadedTravelItems[i] + '</li>'		
		}
		
		
		$('#travel-item-dialog-list ul').html(travelItemListHtml);
		$('#travel-item-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			isNewTravelItem = true;
			
			if(selection == "New Bill")
			{
				$('#travel-item-name-input').val('');
				$('#travel-item-price-input').val('');
			}
			else
			{
				$('#travel-item-name-input').val(selection)
				$('#travel-item-price-input').val('');
			}
			
			$('#travel-item-dialog-list').dialog('close');
			$('#travel-item-dialog-input').dialog('open');
		});
		
		$('#travel-item-dialog-list').dialog('open');
		$('#travel-item-label-button').click();
	});
}

function travelLinkDialogListener()
{
	$('#travel-user-dialog-link').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close');
			},
			"Link": function() {
				var travelItemName = $('#travel-user-dialog-link').dialog('option', 'title');
				
				for(var i = 0; i < travelItemList.length; i++)
				{
					if(travelItemList[i].name == travelItemName)
					{
						var currUserList = new Array();
						
						$('#travel-user-dialog-link input[type=checkbox]:checked').each(function() {
							var personName = $(this).val();
							
							for(var j = 0; j < travelUserList.length; j++)
							{
								if(travelUserList[j].name == personName)
								{
									currUserList.push(new person(personName, travelUserList[j].email, travelUserList[j].phone));
									break;
								}
							}
						});
						
						travelItemList[i].personList = currUserList;
						
						break;
					}
				}
				
				populateTravelItemList();
				$(this).dialog('close');
			} 
		}
	});
}

function travelInvoiceListener()
{
	$('#travel-invoice-button').click(function() {
		var totalPot = $('#travelPotInput').val(); 
		var invoiceHtml = '<div class="invoice-bar"><p>Travel Invoice</p></div><br/><br/>';
		var tripCalculationsMap = calculateTravelInvoice(travelUserList, travelItemList);
		
		var perPerson = Math.round(totalPot / travelUserList.length * 100) / 100; 
		
		invoiceHtml += '<div class="newSelector" style="margin-bottom:10px;">' + 
			'<div style="float:left;">Item Summary</div>' + 
			'<div style="float:right;"></div><br/></div>';
		
		//Item Summary
		for (var i = 0; i < travelItemList.length; i++)
		{
			var currName = travelItemList[i].name;
			var currPrice = travelItemList[i].price; 
			var peopleLinked = travelItemList[i].personList.length;
			
			invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
				'<div style="float:right;">$' + currPrice + '</div><br/>';
			
			if(peopleLinked == 0)
			{
				var personPrice = Math.round(currPrice / travelUserList.length * 100) / 100;
				
				invoiceHtml +='<div style="float:left;margin-left:15px;" class="small-info-text">Per Person Owes</div>' + 
					'<div style="float:right;" class="small-info-text">$' + personPrice + '</div><br/>'; 
			}
			else
			{
				var personPrice = Math.round(currPrice / travelItemList[i].personList.length * 100) / 100;
				
				for(var j = 0; j < travelItemList[i].personList.length; j++)
				{
					var currPerson = travelItemList[i].personList[j].name;
					
					invoiceHtml +='<div style="float:left;margin-left:15px;" class="small-info-text">'+ currPerson + '</div>' + 
						'<div style="float:right;" class="small-info-text">$' + personPrice + '</div><br/>'; 
				}
			}
		}

		invoiceHtml += '<div class="clearDiv" style="margin-bottom:10px;"></div>' + 
			'<div style="float:left;">Total Pot</div>' + 
			'<div style="float:right;">$' + totalPot + '</div><br/>';
		
		invoiceHtml += '<div style="float:left;margin-left:15px;" class="small-info-text">Per Person Owes</div>' + 
			'<div style="float:right;" class="small-info-text">$' + perPerson + '</div><br/>';
		
		invoiceHtml += '<div class="clearDiv" style="margin-bottom:20px;"></div>' + 
				'<div class="newSelector" style="margin-bottom:10px;">' + 
				'<div style="float:left;">Name</div>' + 
				'<div style="float:right;">Owes</div><br/></div>';
		
		for(var i = 0; i < travelUserList.length; i++)
		{
			var currName = travelUserList[i].name;
			var currPay = tripCalculationsMap[currName];			
			
			currPay = Math.round(currPay * 100) / 100;
			
			if(currPay >= 0)
				invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
					'<div style="float:right;">$' + currPay + '</div><br/>';
			else
				invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
					'<div style="float:right;">-$' + parseFloat(currPay *-1)+ '</div><br/>';
		}
		
		invoiceHtml += '<div class="clearDiv"></div>' + 
				'<button id="travel-back-button" class="invoice-button">Back</button>';
		
		
		$('#travel-page').fadeOut(500, function() {
			$('#travel-invoice').html(invoiceHtml);
			$('#travel-invoice').fadeIn(500);
			
			$('#travel-back-button').button().click(function() {
				$('#travel-invoice').fadeOut(500, function() {
					$('#travel-page').fadeIn(500);
				});
			});
		});
		
	});
}

function travelFormListener() {
	
	$('#travel-user-label-button').click(function() {
		$('#travel-item-list').hide('blind', 500);
		$('#travel-user-list').show('blind', 500);		
	});
	
	$('#travel-item-label-button').click(function() {
		$('#travel-user-list').hide('blind', 500);		
		$('#travel-item-list').show('blind', 500);
	});
	
	travelUserDialogListener();
	travelItemDialogListener();
	travelLinkDialogListener();
	travelInvoiceListener();
	
	$('#travelPotInput').attr('disabled', true);
}
