
function calculateTravelInvoice(allPersonList, travelItemList)
{
	var amountToPay = {};

	this.allPersonList = allPersonList;
	this.travelItemList = travelItemList;
	
	var currTotalMap = {};
	var totalPot = 0;


	//Populates and increments overall contributed to the pot
	for (var i=0; i < travelItemList.length; i++)
	{ 	
		for(var j = 0; j < travelItemList[i].personList.length; j++)
		{
			
			if(isNaN(currTotalMap[travelItemList[i].personList[j].name]))
			{
				currTotalMap[travelItemList[i].personList[j].name] = travelItemList[i].price;	
			}
			else 
			{
				currTotalMap[travelItemList[i].personList[j].name] += travelItemList[i].price;					
			}

		}
		totalPot += travelItemList[i].price;
		
	}

	var averagePerPerson = totalPot/allPersonList.length;

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
