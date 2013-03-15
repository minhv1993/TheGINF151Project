var foodUserList = new Array();		
var foodItemList = new Array();
var isNewItem = true; 

function foodItem(name, price, personList)
{
	this.name = name; 
	this.price = price;
	this.personList = personList; 
}

function removeUser(name, email, phone)
{
	for(var i = 0; i < foodUserList.length; i++)
	{
		if(name == foodUserList[i].name)
		{
			foodContactList.push(new person(name, email, phone));
			foodUserList.splice(i, 1);
			break;
		}
	}
	
	for(var i = 0; i < foodItemList.length; i++)
	{
		for(var j = 0; j < foodItemList[i].personList.length; j++)
		{
			if(name == foodItemList[i].personList[j].name)
			{
				foodItemList[i].personList.splice(j, 1);
				break;
			}
		}
	}
	
	populateFoodUserList();
	populateFoodItemList();
}


function editFoodItem(name, price)
{
	isNewItem = false;
	
	$('#food-item-name-input').val(name);
	$('#food-item-price-input').val(price);
	//$('#food-item-quantity-input').val(quantity);
	$('#food-item-name-input').attr("disabled", true);
	$('#food-item-dialog-input').dialog('open');
}

function linkFoodItem(name, price)
{
	var foodUserListHtml = ''; 
	foodUserList.sort(compareNames);
	
	var currUserList = new Array();
	
	//Obtains list of people linked to this item
	for(var i = 0; i < foodItemList.length; i++)
	{
		if(foodItemList[i].name == name)
			currUserList = foodItemList[i].personList;
	}
	
	//check boxes of those users with a link
	for(var i = 0; i < foodUserList.length; i++)
	{
		var currName = foodUserList[i].name;
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
			foodUserListHtml += '<input type="checkbox" name="foodUser" value="' 
				+ currName + '" class="checkbox">' + currName + '<br/>'
		}
		else
		{
			foodUserListHtml += '<input type="checkbox" name="foodUser" value="' + 
				currName + '" class="checkbox" checked="true">' + currName + '<br/>'
		}
	}
	
	$('#food-user-dialog-link').dialog("option", "title", name);
	$('#food-user-dialog-link').html(foodUserListHtml);
	$('#food-user-dialog-link').dialog('open');
}


function populateFoodUserList()
{
	var foodUserListHtml = "";
	
	foodUserList.sort(compareNames);
	for(var i = 0; i < foodUserList.length; i++)
	{
		var currName = foodUserList[i].name; 
		var currEmail = foodUserList[i].email; 
		var currPhone = foodUserList[i].phone;
		
		foodUserListHtml += '<div class="items-form"><button class="icon-button" onclick="removeUser(\'' + currName + 
				'\', \'' + currEmail + '\', \'' + currPhone + '\')">-</button>&nbsp;' + currName + '</div>'; 	
	}
	
	$('#food-user-list').html(foodUserListHtml);
	$('#food-user-list button').button({
		icons: {
		    primary: "ui-icon-minus"
		  },
		  text: false
	});
}

function populateFoodItemList()
{
	var foodItemListHtml = "";
	var potAmount = 0; 
	foodItemList.sort(compareNames);
	
	for(var i = 0; i < foodItemList.length; i++)
	{
		var currName = foodItemList[i].name; 
		var currPrice = foodItemList[i].price;
	//	var currQuantity = foodItemList[i].quantity; 	
		
		//var subTotal = Math.round(currPrice * currQuantity *100) / 100; 
		//potAmount += parseFloat(subTotal); 
		potAmount += parseFloat(currPrice);
		
		foodItemListHtml += '<div class="items-form">' + 
			'<div style="float:left;"><button class="icon-button" onclick="editFoodItem(\'' 
				+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;' + 
			'<button class="link-button" onclick="linkFoodItem(\'' 
				+ currName + '\', \'' + currPrice + '\')">-</button>&nbsp;</div>' + 
				'<div style="float:left;">' + currName + '<br/>' + 
				'<span class="small-info-text">';
		
		for(var j = 0; j < foodItemList[i].personList.length; j++)
		{
			var currPersonName = foodItemList[i].personList[j].name; 
			foodItemListHtml += '[' + currPersonName + ']';
		}
						
		foodItemListHtml +='</span></div>' + 
				'<span style="float:right;">$' + currPrice + '</span></div>' + 
				'<div class="clearDiv"></div>'; 
		
	}
	
	potAmount = Math.round(potAmount * 100) / 100;
	$('#foodSubtotalInput').val('$' + potAmount);
	
	$('#food-item-list').html(foodItemListHtml);
	$('#food-item-list .icon-button').button({
		icons: {
		    primary: "ui-icon-wrench"
		  },
		  text: false
	});
	
	$('#food-item-list .link-button').button({
		icons: {
		    primary: "ui-icon-person"
		  },
		  text: false
	});
}

function foodUserDialogListener() 
{
	$('#food-user-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#food-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		width: dialogWidth, 
		modal: true,
		height: dialogHeight,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#food-user-name-input').val();
				var email = $('#food-user-email-input').val();
				var phone = $('#food-user-phone-input').val();
				
				var isNameFound = false; 
				
				for(var i = 0; i < foodUserList.length; i++)
				{
					if(name == foodUserList[i].name)
					{
						isNameFound = true;
						alert('User with that name already exists!');
						break;
					}
				}
				
				if(!isNameFound)
				{
					for(var i = 0; i < foodContactList.length; i++)
					{
						if(name == foodContactList[i].name )
						{
							isNameFound = true;
							alert('User with that name already exists!');
							break;
						}
					}
				}
				
				if(!isNameFound)
				{
					foodUserList.push(new person(name, email, phone));
					populateFoodUserList();
				}
				
				$(this).dialog('close');
			} 
		}
	});

	$('#food-user-add-button').click(function() {
		var contactHtml = '<li class="newSelector">New User</li>'; 
		
		foodContactList.sort(compareNames);
		for(var i = 0; i < foodContactList.length; i++)
		{
			contactHtml += '<li>' + foodContactList[i].name + '</li>'		
		}
		
		$('#food-user-dialog-list ul').html(contactHtml);
		
		$('#food-user-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New User")
			{
				$('#food-user-name-input').val('');
				$('#food-user-email-input').val('');
				$('#food-user-phone-input').val('');
			
				$('#food-user-dialog-list').dialog('close');
				$('#food-user-dialog-input').dialog('open');
			}
			else
			{
				for(var i = 0; i < foodContactList.length; i++)
				{
					var name = foodContactList[i].name; 
					var email = foodContactList[i].email; 
					var phone = foodContactList[i].phone; 
					
					if(name == selection)
					{
						foodUserList.push(new person(name, email, phone));
						foodContactList.splice(i, 1);
						populateFoodUserList();
						
						break;
					}
				}
				
				$('#food-user-dialog-list').dialog('close');
			}
		});
		
		$('#food-user-dialog-list').dialog('open');
		$('#food-user-label-button').click();
	});

}

function foodItemDialogListener() 
{
	$('#food-item-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		modal: true,
		width: dialogWidth, 
		height: dialogHeight
	});
	
	$('#food-item-dialog-input').dialog({
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
				if(!isNewItem) 
				{
					var name = $('#food-item-name-input').val();
					
					for(var i = 0; i < foodItemList.length; i++)
					{
						if(name == foodItemList[i].name)
						{
							foodItemList.splice(i, 1);
							break;
						}
								
					}
					populateFoodItemList();
				}
				
				$(this).dialog('close');
			},
			"Add": function() {
				
				var name = $('#food-item-name-input').val();
				var price = $('#food-item-price-input').val();
				//var quantity = $('#food-item-quantity-input').val();
				
				for(var i = 0; i < foodItemList.length; i++)
				{
					if(name == foodItemList[i].name)
					{
						if(isNewItem)
						{
							//foodItemList[i].price = price;
							isNewItem = false;
							alert('Food Item with that name already exists!');							
						}
						else
						{
							foodItemList[i].price = price;
							//foodItemList[i].quantity = quantity;
						}
						break;
					}
							
				}
				
				if(!isNaN(price)) //&& !isNaN(quantity))
				{
					if(price == "")
						price = 0;
					
//					if(quantity == "")
//						quantity = 0; 
					
//					if(isNewItem)
//						foodItemList.push(new foodItem(name, price, quantity));
					if(isNewItem)
						foodItemList.push(new foodItem(name, price, new Array()));
					
					populateFoodItemList();
					$(this).dialog('close');
				}
				else
				{
					alert('Please insert valid values for price');
				}
			} 
		}
	});

	$('#food-item-add-button').click(function() {
		$('#food-item-name-input').removeAttr("disabled");
		var foodListHtml = '<li class="newSelector">New Food Item</li>';
		/*
		for(var i = 0; i < foodItemList.length; i++)
		{
			foodListHtml += '<li>' + foodItemList[i].name + '</li>'		
		}
		*/
		
		$('#food-item-dialog-list ul').html(foodListHtml);
		$('#food-item-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New Food Item")
			{
				$('#food-item-name-input-span').show();
				$('#food-item-name-input').val('');
				$('#food-item-price-input').val('');
				//$('#food-item-quantity-input').val('');
				isNewItem = true;
			}
			else
			{
				$('#food-item-name-input-span').hide();
				$('#food-item-name-input').val(selection)
			}
			
			$('#food-item-dialog-list').dialog('close');
			$('#food-item-dialog-input').dialog('open');
		});
		
		$('#food-item-dialog-list').dialog('open');
		$('#food-item-label-button').click();
	});
}

function foodLinkDialogListener()
{
	$('#food-user-dialog-link').dialog({
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
				var foodItemName = $('#food-user-dialog-link').dialog('option', 'title');
				
				for(var i = 0; i < foodItemList.length; i++)
				{
					if(foodItemList[i].name == foodItemName)
					{
						var currUserList = new Array();
						
						$('#food-user-dialog-link input[type=checkbox]:checked').each(function() {
							var personName = $(this).val();
							
							for(var j = 0; j < foodUserList.length; j++)
							{
								if(foodUserList[j].name == personName)
								{
									currUserList.push(new person(personName, foodUserList[j].email, foodUserList[j].phone));
									break;
								}
							}
						});
						
						foodItemList[i].personList = currUserList;
						
						break;
					}
				}
				
				populateFoodItemList();
				$(this).dialog('close');
			} 
		}
	});
}

function foodInvoiceListener()
{
	$('#food-invoice-button').click(function() {

		var isAllLinked = true; 
		
		for(var i = 0; i < foodItemList.length; i++)
		{
			if(foodItemList[i].personList.length == 0)
			{
				isAllLinked = false;
				break;
			}
		}
		
		if(isAllLinked)
		{
			var invoiceHtml = '<div class="invoice-bar"><p>Food Invoice</p></div><br/><br/>';
			var tipPercent = $('#tipInput').val(); 
			var taxPercent = $('#taxInput').val();
			
			if(isNaN(tipPercent) || tipPercent == "")
				tipPercent = 0; 
			
			if(isNaN(taxPercent) || taxPercent == "")
				taxPercent = 0; 
			
			var foodCalculationsMap = calculatePricePerPerson(foodUserList, tipPercent, taxPercent, foodItemList);
			var personToItemsMap = itemByPerson(foodUserList, foodItemList);
			
			invoiceHtml += '<div class="newSelector" style="margin-bottom:10px;">' + 
					'<div style="float:left;">Name</div>' + 
					'<div style="float:right;">Price</div><br/></div>';
			
			for(var i = 0; i < foodUserList.length; i++)
			{
				var currName = foodUserList[i].name;
				var currPay = foodCalculationsMap[currName];			
				
				if(isNaN(currPay))
					currPay = 0; 
				
				currPay = Math.round(currPay * 100) / 100;
				
				
				invoiceHtml +='<div style="float:left;">' + currName + '</div>' + 
					'<div style="float:right;">$' + currPay + '</div><br/>';
				
				var currItemList = personToItemsMap[currName];
				for(var j = 0; j < currItemList.length; j++)
				{
					var currItem = currItemList[j].name;
					var currPrice = Math.round(currItemList[j].price / currItemList[j].personList.length * 100) / 100;
					
					invoiceHtml +='<div style="float:left;margin-left:15px;" class="small-info-text">'
						+ currItem + '</div>' + 
						'<div style="float:right;" class="small-info-text">$' + currPrice + '</div><br/>'; 
				}
			
			}
			
			invoiceHtml += '<div class="clearDiv" style="margin-bottom:20px;"></div>' + 
				'<div class="newSelector" style="margin-bottom:10px;">' + 
				'<div style="float:left;">Summary</div>' + 
				'<div style="float:right;"></div><br/></div>';
			
			invoiceHtml +='<div style="float:left;">Subtotal</div>' + 
				'<div style="float:right;">' + $('#foodSubtotalInput').val() + '</div><br/>';
			invoiceHtml +='<div style="float:left;">Tax</div>' + 
				'<div style="float:right;">' + taxPercent + '%</div><br/>';
			invoiceHtml +='<div style="float:left;">Tip</div>' + 
				'<div style="float:right;">' + tipPercent + '%</div><br/>';
			
			invoiceHtml += '<div class="clearDiv" style="margin-bottom:20px;"></div>' + 
				'<div style="float:left;">Total</div>' + 
				'<div style="float:right;">$' + totalFoodBill(foodItemList, tipPercent, taxPercent) + '</div><br/>';
			
			invoiceHtml += '<div class="clearDiv"></div>' + 
					'<button id="food-back-button" class="invoice-button">Back</button>';
			
			
			$('#food-page').fadeOut(500, function() {
				$('#food-invoice').html(invoiceHtml);
				$('#food-invoice').fadeIn(500);
				
				$('#food-back-button').button().click(function() {
					$('#food-invoice').fadeOut(500, function() {
						$('#food-page').fadeIn(500);
					});
				});
			});
		}
		else
		{
			alert('You have food entries that are not linked to anyone');
		}
	});
}

function foodFormListener() 
{
	$('#food-user-label-button').click(function() {
		$('#food-item-list').hide('blind', 500);
		$('#food-user-list').show('blind', 500);		
	});
	
	$('#food-item-label-button').click(function() {
		$('#food-user-list').hide('blind', 500);		
		$('#food-item-list').show('blind', 500);
	});

	foodUserDialogListener();
	foodItemDialogListener();
	foodLinkDialogListener();
	foodInvoiceListener();
	
	$('#foodRadio').click();
	$('#foodForm').show(); 
	$('#foodSubtotalInput').attr('disabled', true);
}