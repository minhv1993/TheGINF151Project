var currTotalMap = {};

function calculateTravelInvoice(allPersonList, itemsList)
{
	var amountToPay = {};

	var totalPot = 0;

	//Populates and increments overall contributed to the pot
	for (var i=0; i < itemsList.length; i++)
	{ 	
		for(var j = 0; j < itemsList[i].personList.length; j++)
		{
			
			if(isNaN(currTotalMap[itemsList[i].personList[j].name]))
			{
				currTotalMap[itemsList[i].personList[j].name] = itemsList[i].price/itemsList[i].personList.length;	
			}
			else 
			{
				currTotalMap[itemsList[i].personList[j].name] += itemsList[i].price/itemsList[i].personList.length;					
			}

		}
		totalPot += parseFloat(itemsList[i].price);
	}

	var averagePerPerson = totalPot/allPersonList.length;
	averagePerPerson = Math.round(averagePerPerson * 100) / 100;

	//Calculates how much is left to pay based on average
	for(var k = 0; k < allPersonList.length; k++)
	{
		if(isNaN(currTotalMap[allPersonList[k].name]))
		{
			amountToPay[allPersonList[k].name] = averagePerPerson;
		}
		else
		{
			amountToPay[allPersonList[k].name] = averagePerPerson - currTotalMap[allPersonList[k].name];
		}
	}
	
	return amountToPay;
}



//FOOD STUFF
function person (name, email, phone) {
	this.name = name;
	this.email = email;
	this.phone = phone;
	
}

function foodItem(name, price, personList) {
	this.name = name;
	this.price = price;
	this.personList = personList;
}


function calculatePricePerPerson(allPersons, tipPercent, taxPercent, iList) {
	var mapTotalPerPerson = {};

	var sum = Math.round(totalPrice(iList)*100)/100;
	var tip = tipPrice(tipPercent, iList);
	var tax = taxPrice(taxPercent, iList);	
	var tipPerPerson = parseFloat(tip/allPersons.length);
	var taxPerPerson = parseFloat(tax/allPersons.length);


	for (var i = 0; i < iList.length; i++)
	{
		var pricePerson = Math.round(iList[i].price/iList[i].personList.length*100)/100;
		for (var j = 0; j < iList[i].personList.length; j++)
		{

			if(isNaN(mapTotalPerPerson[iList[i].personList[j].name]))
			{

				mapTotalPerPerson[iList[i].personList[j].name] = pricePerson;	
			}
			else 
			{
				mapTotalPerPerson[iList[i].personList[j].name] += pricePerson;					
			}

		}
	}	




	for(var k = 0; k < allPersons.length; k++)
	{
		mapTotalPerPerson[allPersons[k].name] += parseFloat(tipPerPerson+taxPerPerson);
	}

	alert(sum+tip+tax);

	return mapTotalPerPerson;
}

function totalPrice(iList) {
	var total = 0;
	var tip;
	
	for (var i = 0; i < iList.length; i++)
	{
		total += iList[i].price;
	}

	return total;
}


function tipPrice(tipPercent, iList) {
	var total = 0;
	var tip;
	for (var i = 0; i < iList.length; i++)
	{
		total += iList[i].price;
	}

	tip = Math.round(total * tipPercent*100)/100;

	return tip;
}	


function taxPrice(taxPercent, iList) {
	var total = 0;
	var tax;
	for (var i = 0; i < iList.length; i++)
	{
		total += iList[i].price;
	}

	tax = Math.round(total * taxPercent*100)/100;

	return tax;
}


//Function that returns a map of persons that contain an array of items
function itemByPerson(pList, iList) {
	
	var mapPersonToItems = {};
	for (var p = 0; p < pList.length; p++)
	{
		mapPersonToItems[pList[p].name] = new Array();
		for (var i = 0; i < iList.length; i++)
		{
			for (var j = 0; j < iList[i].personList.length; j++)
			{
				if (pList[p].name == iList[i].personList[j].name)
				{
					mapPersonToItems[pList[p].name].push(iList[i]);
				}
			}
		}
	}
	return mapPersonToItems;
}

