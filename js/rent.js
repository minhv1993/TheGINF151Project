var rentUserList = new Array();		
var billList = new Array();
var preloadedBills = new Array("Electricity", "Gas", "Sewer", "Water", "Heat/AC", "Internet");
var isNewBill = true; 

function bill(name, price, personList)
{
	this.name = name; 
	this.price = price;
	this.personList = personList;
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
	
	for(var i = 0; i < billList.length; i++)
	{
		for(var j = 0; j < billList[i].personList.length; j++)
		{
			if(name == billList[i].personList[j].name)
			{
				billList[i].personList.splice(j, 1);
				break;
			}
		}
	}
	
	populateRentUserList();
	populateBillList();
}


function editBill(name, price)
{
	isNewBill = false;
	
	$('#bill-name-input').val(name);
	$('#bill-price-input').val(price);
	$('#bill-name-input').attr("disabled", true);
	$('#bill-dialog-input').dialog('open');
}

function linkBill(name, price)
{
	var rentUserListHtml = '';
	rentUserList.sort(compareNames);
	
	var currUserList = new Array();
	
	//Obtains list of people linked to this item
	for(var i = 0; i < billList.length; i++)
	{
		if(billList[i].name == name)
			currUserList = billList[i].personList;
	}
	
	//check boxes of those users with a link
	for(var i = 0; i < rentUserList.length; i++)
	{
		var currName = rentUserList[i].name;
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
			rentUserListHtml += '<input type="checkbox" name="rentUser" value="' 
				+ currName + '" class="checkbox">' + currName + '<br/>'
		}
		else
		{
			rentUserListHtml += '<input type="checkbox" name="rentUser" value="' + 
				currName + '" class="checkbox" checked="true">' + currName + '<br/>'
		}
	}
	
	$('#rent-user-dialog-link').dialog("option", "title", name);
	$('#rent-user-dialog-link').html(rentUserListHtml);
	$('#rent-user-dialog-link').dialog('open');
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
	billList.sort(compareNames);

	for(var i = 0; i < billList.length; i++)
	{

		var currName = billList[i].name; 
		var currPrice = billList[i].price;

		billListHtml += '<div class="items-form">' + 
				'<div style="float:left;"><button class="icon-button" onclick="editBill(\'' 
					+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
				'<button class="link-button" onclick="linkBill(\'' 
					+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;</div>' + 
					'<div style="float:left;">' + currName + '<br/>' + 
						'<span class="small-info-text">';
		
		for(var j = 0; j < billList[i].personList.length; j++)
		{
			var currPersonName = billList[i].personList[j].name; 
			billListHtml += '[' + currPersonName + ']';
		}
						
		billListHtml +='</span></div>' + 
				'<span style="float:right;">$' + currPrice + '</span></div>' + 
				'<div class="clearDiv"></div>'; 
	}
	
	
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
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#rent-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight,
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
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#bill-dialog-input').dialog({
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
						billList.push(new bill(name, price, new Array()));

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

function rentLinkDialogListener()
{
	$('#rent-user-dialog-link').dialog({
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
				var billName = $('#rent-user-dialog-link').dialog('option', 'title');
				
				for(var i = 0; i < billList.length; i++)
				{
					if(billList[i].name == billName)
					{
						var currUserList = new Array();
						
						$('#rent-user-dialog-link input[type=checkbox]:checked').each(function() {
							var personName = $(this).val();
							
							for(var j = 0; j < rentUserList.length; j++)
							{
								if(rentUserList[j].name == personName)
								{
									currUserList.push(new person(personName, rentUserList[j].email, rentUserList[j].phone));
									break;
								}
							}
						});
						
						billList[i].personList = currUserList;
						
						break;
					}
				}
				
				populateBillList();
				$(this).dialog('close');
			} 
		}
	});
}

function rentInvoiceListener()
{
	$('#rent-invoice-button').click(function() {
		
		var invoiceHtml = '<div class="invoice-bar"><p>Rent Invoice</p></div><br/><br/>';
		var rentCost = $('#rentInput').val();
		var rentCalculationsMap = calculateRentInvoice(rentUserList, billList, rentCost);

		if(isNaN(tipPercent))
			rentCost = 0; 
		
		invoiceHtml += '<div class="newSelector" style="margin-bottom:10px;">' + 
				'<div style="float:left;">Name</div>' + 
				'<div style="float:right;">Rent Due</div><br/></div>';
		
		for(var i = 0; i < rentUserList.length; i++)
		{
			var currName = rentUserList[i].name;
			var currPay = rentCalculationsMap[currName];
			
			currPay = Math.round(currPay * 100) / 100;
			
			if(currPay >= 0)
				invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
					'<div style="float:right;">$' + currPay + '</div><br/>';
			else
				invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
					'<div style="float:right;">-$' + parseFloat(currPay *-1)+ '</div><br/>';
		}
		
		invoiceHtml += '<div class="clearDiv"></div>' + 
				'<button id="rent-back-button" class="invoice-button">Back</button>';
		
		
		$('#rent-page').fadeOut(500, function() {
			$('#rent-invoice').html(invoiceHtml);
			$('#rent-invoice').fadeIn(500);
			
			$('#rent-back-button').button().click(function() {
				$('#rent-invoice').fadeOut(500, function() {
					$('#rent-page').fadeIn(500);
				});
			});
		});
		
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
	rentLinkDialogListener();
	rentInvoiceListener();
}