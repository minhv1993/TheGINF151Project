var rentUserList = new Array();		
var billList = new Array();
var preloadedBills = new Array("Electricity", "Gas", "Sewer", "Water", "Heat/AC", "Internet");
var isNewBill = true; 

function bill(name, price)
{
	this.name = name; 
	this.price = price;
}

function removeUser(name, email, phone)
{
	for(var i = 0; i < rentUserList.length; i++)
	{
		if(name == rentUserList[i].name)
		{
			rentContactList.push(new person(name, email, phone));
			rentUserList.splice(i, 1);
			break;
		}
	}
	
	populateRentUserList();
}


function editBill(name, price)
{
	isNewBill = false;
	
	$('#bill-name-input').val(name);
	$('#bill-price-input').val(price);
	$('#bill-name-input').attr("disabled", true);
	$('#bill-dialog-input').dialog('open');
}

function linkBill(name, price, quantity)
{
	var contactHtml = ''; 
	
	rentUserList.sort(compareNames);
	
	/*
	for(var i = 0; i < rentContactList.length; i++)
	{
		contactHtml += '<li>' + rentContactList[i].name + '</li>'		
	}
	
	$('#rent-user-dialog-list ul').html(contactHtml);
	
	$('#rent-user-dialog-list li').click(function() {
		
		var selection = $(this).text();
		
		if(selection == "New User")
		{
			$('#rent-user-name-input').val('');
			$('#rent-user-email-input').val('');
			$('#rent-user-phone-input').val('');
		
			$('#rent-user-dialog-list').dialog('close');
			$('#rent-user-dialog-input').dialog('open');
		}
		else
		{
			for(var i = 0; i < rentContactList.length; i++)
			{
				var name = rentContactList[i].name; 
				var email = rentContactList[i].email; 
				var phone = rentContactList[i].pone; 
				
				if(name == selection)
				{
					rentUserList.push(new person(name, email, phone));
					rentContactList.splice(i, 1);
					populaterentUserList();
					
					break;
				}
			}
			
			$('#rent-user-dialog-list').dialog('close');
		}
	});
	
	$('#rent-user-dialog-list').dialog('open');
	$('#rent-user-label-button').click();
	*/
}


function populateRentUserList()
{
	var rentUserListHtml = "";
	
	rentUserList.sort(compareNames);
	for(var i = 0; i < rentUserList.length; i++)
	{
		var currName = rentUserList[i].name; 
		var currEmail = rentUserList[i].email; 
		var currPhone = rentUserList[i].phone;
		
		rentUserListHtml += '<div class="items-form"><button class="icon-button" onclick="removeUser(\'' + currName + 
				'\', \'' + currEmail + '\', \'' + currPhone + '\');">-</button>&nbsp;' + currName + '</div>'; 			
	}	
	
	$('#rent-user-list').html(rentUserListHtml);
	
	$('#rent-user-list button').button({
		icons: {
		    primary: "ui-icon-minus"
		  },
		  text: false
	});
}

function populateBillList()
{
	var billListHtml = "";
	var potAmount = 0; 
	billList.sort(compareNames);
	
	for(var i = 0; i < billList.length; i++)
	{
		var currName = billList[i].name; 
		var currPrice = billList[i].price;
		
		potAmount += parseFloat(currPrice); 
		
		billListHtml += '<div class="items-form">' + 
				'<span style="float:left;"><button class="icon-button" onclick="editBill(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
				'<button class="link-button" onclick="linkBill(\'' 
						+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
						'' + currName + '</span>' + 
				'<span style="float:right;">$' + currPrice + '</span></div>' + 
				'<div class="clearDiv"></div>'; 
		
	}
	
	potAmount = Math.round(potAmount * 100) / 100;
	$('#rentInput').val('$' + potAmount);
	
	$('#bill-list').html(billListHtml);
	$('#bill-list .icon-button').button({
		icons: {
		    primary: "ui-icon-wrench"
		},
		text: false
	});
	
	$('#bill-list .link-button').button({
		icons: {
		    primary: "ui-icon-person"
		  },
		  text: false
	});
}

function rentUserDialogListener() 
{
	$('#rent-user-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		height: 400
	});
	
	$('#rent-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		modal: true,
		height: 400,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#rent-user-name-input').val();
				var email = $('#rent-user-email-input').val();
				var phone = $('#rent-user-phone-input').val();
				
				var isNameFound = false; 
				
				for(var i = 0; i < rentUserList.length; i++)
				{
					if(name == rentUserList[i].name)
					{
						isNameFound = true;
						alert('User with that name already exists!');
						break;
					}
				}
				
				if(!isNameFound)
				{
					for(var i = 0; i < rentContactList.length; i++)
					{
						if(name == rentContactList[i].name )
						{
							isNameFound = true;
							alert('User with that name already exists!');
							break;
						}
					}
				}
				
				if(!isNameFound)
				{
					rentUserList.push(new person(name, email, phone));
					populateRentUserList();
				}
				
				$(this).dialog('close');
			} 
		}
	});

	$('#rent-user-add-button').click(function() {
		var contactHtml = '<li class="newSelector">New User</li>'; 
		
		rentContactList.sort(compareNames);
		for(var i = 0; i < rentContactList.length; i++)
		{
			contactHtml += '<li>' + rentContactList[i].name + '</li>'		
		}
		
		$('#rent-user-dialog-list ul').html(contactHtml);
		
		$('#rent-user-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New User")
			{
				$('#rent-user-name-input').val('');
				$('#rent-user-email-input').val('');
				$('#rent-user-phone-input').val('');
			
				$('#rent-user-dialog-list').dialog('close');
				$('#rent-user-dialog-input').dialog('open');
			}
			else
			{
				for(var i = 0; i < rentContactList.length; i++)
				{
					var name = rentContactList[i].name; 
					var email = rentContactList[i].email; 
					var phone = rentContactList[i].phone; 
					
					if(name == selection)
					{
						rentUserList.push(new person(name, email, phone));
						rentContactList.splice(i, 1);
						populateRentUserList();
						
						break;
					}
				}
				
				$('#rent-user-dialog-list').dialog('close');
			}
		});
		
		$('#rent-user-dialog-list').dialog('open');
		$('#rent-user-label-button').click();
	});

}

function billDialogListener() 
{
	$('#bill-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		height: 400
	});
	
	$('#bill-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		modal: true,
		height: 400,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close');
			},
			"Delete": function() {
				var name = $('#bill-name-input').val();
				
				for(var i = 0; i < billList.length; i++)
				{
					if(name == billList[i].name)
					{
						billList.splice(i, 1);
						preloadedBills.push(name);
						break;
					}
							
				}
				populateBillList();
				
				$(this).dialog('close');
			},
			"Add": function() {
				
				var name = $('#bill-name-input').val();
				var price = $('#bill-price-input').val();
				
				for(var i = 0; i < billList.length; i++)
				{
					if(name == billList[i].name)
					{
						if(isNewBill)
						{
							isNewBill = false;
							alert('You have already added a bill with that name!');							
						}
						else
						{
							billList[i].price = price;
						}
						break;
					}
							
				}
				
				if(!isNaN(price))
				{
					if(price == "")
						price = 0;
					
					if(isNewBill)
					{
						billList.push(new bill(name, price));
						
						for(var i = 0; i < preloadedBills.length; i++)
						{
							if(preloadedBills[i] == name)
							{
								preloadedBills.splice(i, 1);
								break;
							}
						}
							
					}
					
					populateBillList();
					$(this).dialog('close');
				}
				else
				{
					alert('Please insert valid value for price');
				}
			} 
		}
	});

	$('#bill-add-button').click(function() {
		$('#bill-name-input').removeAttr("disabled");
		var billListHtml = '<li class="newSelector">New Bill</li>';
		
		preloadedBills.sort();
		
		for(var i = 0; i < preloadedBills.length; i++)
		{
			billListHtml += '<li>' + preloadedBills[i] + '</li>'		
		}
		
		
		$('#bill-dialog-list ul').html(billListHtml);
		$('#bill-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			isNewBill = true;
			
			if(selection == "New Bill")
			{
				$('#bill-name-input').val('');
				$('#bill-price-input').val('');
			}
			else
			{
				$('#bill-name-input').val(selection)
				$('#bill-price-input').val('');
			}
			
			$('#bill-dialog-list').dialog('close');
			$('#bill-dialog-input').dialog('open');
		});
		
		$('#bill-dialog-list').dialog('open');
		$('#bill-label-button').click();
	});
}

function rentFormListener() {
	
	$('#rent-user-label-button').click(function() {
		$('#bill-list').hide('blind', 500);
		$('#rent-user-list').show('blind', 500);		
	});
	
	$('#bill-label-button').click(function() {
		$('#rent-user-list').hide('blind', 500);		
		$('#bill-list').show('blind', 500);
	});
	
	rentUserDialogListener();
	billDialogListener();
	
	$('#rentInput').attr('disabled', true);
}