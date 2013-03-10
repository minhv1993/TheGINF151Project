var foodUserList = new Array();		
var foodItemList = new Array();

function foodItem(name, price)
{
	this.name = name; 
	this.price = price;
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

function populateFoodUserList()
{
	var foodUserListHtml = "";
	
	for(var i = 0; i < foodUserList.length; i++)
	{
		var currName = foodUserList[i].name; 
		var currEmail = foodUserList[i].email; 
		var currPhone = foodUserList[i].phone;
		
		foodUserListHtml += '<button class="icon-button" onclick="removeUser(\'' + currName + 
				'\', \'' + currEmail + '\', \'' + currPhone + '\')">-</button>' + foodUserList[i].name + '<br/>'; 	
	}
	
	$('#food-user-list').html(foodUserListHtml);
	$('#food-user-list button').button({
		icons: {
		    primary: "ui-icon-minus"
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
		height: 300
	});
	
	$('#food-user-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		height: 300,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#food-user-name-input').val();
				var email = $('#food-user-email-input').val();
				var phone = $('#food-user-email-input').val();
				
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
	});

}

function foodItemDialogListener() 
{
	$('#food-item-dialog-list').dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height: 300
	});
	
	$('#food-item-dialog-input').dialog({
		autoOpen:false, 
		resizable: false, 
		draggable: false,
		height: 300,
		buttons: {
			"Cancel": function() {
				$(this).dialog('close')
			},
			"Add": function() {
				var name = $('#food-item-name-input').val();
				var price = $('#food-item-price-input').val();
				
				for(var i = 0; i < foodItemList.length; i++)
				{
					if(name == foodItemList[i].name)
					{
						foodItemList[i].price = price;
						$('#food-item-list').append(name + ' ' + price + '<br/>')
						$(this).dialog('close')
					}
							
				}
				
				foodItemList.push(new foodItem(name, price));
				$('#food-item-list').append(name + ' ' + price + '<br/>')
				$(this).dialog('close');
			} 
		}
	});

	$('#food-item-add-button').click(function() {
		
		var foodListHtml = '<li class="newSelector">New Food Item</li>';
		
		for(var i = 0; i < foodItemList.length; i++)
		{
			foodListHtml += '<li>' + foodItemList[i].name + '</li>'		
		}
		
		$('#food-item-dialog-list ul').html(foodListHtml);
		
		$('#food-item-dialog-list li').click(function() {
			
			var selection = $(this).text();
			
			if(selection == "New Food Item")
			{
				$('#food-item-name-input-span').show();
				$('#food-item-name-input').val('');
				$('#food-item-price-input').val('');
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
}