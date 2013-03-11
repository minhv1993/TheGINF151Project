var foodUserList = new Array();		
var foodItemList = new Array();
var isNewItem = true; 

function foodItem(name, price, quantity)
{
	this.name = name; 
	this.price = price;
	this.quantity = quantity; 
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
	
	populateFoodUserList();
}


function editFoodItem(name, price, quantity)
{
	isNewItem = false;
	
	$('#food-item-name-input').val(name);
	$('#food-item-price-input').val(price);
	$('#food-item-quantity-input').val(quantity);
	$('#food-item-name-input').attr("disabled", true);
	$('#food-item-dialog-input').dialog('open');
}

function linkFoodItem(name, price, quantity)
{
	var contactHtml = ''; 
	
	foodUserList.sort(compareNames);
	
	/*
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
				var phone = foodContactList[i].pone; 
				
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
	*/
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
		var currQuantity = foodItemList[i].quantity; 	
		
		var subTotal = Math.round(currPrice * currQuantity *100) / 100; 
		potAmount += parseFloat(subTotal); 
		
		foodItemListHtml += '<div class="items-form">' + 
				'<div style="float:left;"><button class="icon-button" onclick="editFoodItem(\'' 
						+ currName + '\', \'' + currPrice + '\', \'' + currQuantity +'\')">-</button>&nbsp;' + 
				'<button class="link-button" onclick="linkFoodItem(\'' 
						+ currName + '\', \'' + currPrice + '\', \'' + currQuantity +'\')">-</button>&nbsp;' + 
						'' + currName + ' (x' + currQuantity + ') - <span class="small-info-text">$' + currPrice + '</span></div>' + 
				'<div style="float:right;">$' + subTotal + '</div></div>' + 
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
		height: 400
	});
	
	$('#food-user-dialog-input').dialog({
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
		height: 400
	});
	
	$('#food-item-dialog-input').dialog({
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
				var quantity = $('#food-item-quantity-input').val();
				
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
							foodItemList[i].quantity = quantity;
						}
						break;
					}
							
				}
				
				if(!isNaN(price) && !isNaN(quantity))
				{
					if(price == "")
						price = 0;
					
					if(quantity == "")
						quantity = 0; 
					
					if(isNewItem)
						foodItemList.push(new foodItem(name, price, quantity));
					
					populateFoodItemList();
					$(this).dialog('close');
				}
				else
				{
					alert('Please insert valid values for price and/or quantity');
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
				$('#food-item-quantity-input').val('');
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

function foodFormListener() {
	
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
	
	$('#foodRadio').click();
	$('#foodForm').show(); 
	$('#foodSubtotalInput').attr('disabled', true);
}