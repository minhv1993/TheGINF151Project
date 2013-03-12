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
