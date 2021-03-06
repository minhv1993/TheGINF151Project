<?php include('header.php');?>
<div data-role="header" data-theme="b" data-position="fixed">
	<a href="index.php" class="ui-btn-left ui-icon-nodisc" data-iconshadow="false" data-rol="button" data-inline="true" data-iconpos="notext" data-icon="home" data-theme="b" data-corners="false"></a>
	<span class="ui-title">Quick Select</span>
</div>
<div id="content-php" data-role="content">
	<div id="nav-bar-radio" data-role="controlgroup" data-type="horizontal">
		<input type="radio" id="foodRadio" name="optionsRadio" checked/><label for="foodRadio">Food</label>
		<input type="radio" id="rentRadio" name="optionsRadio" /><label for="rentRadio">Rent</label>
		<input type="radio" id="travelRadio" name="optionsRadio" /><label for="travelRadio">Travel</label>
	</div>
	<div data-role="collapsible-set" data-theme="b" data-content-theme="d" data-collapsed-icon="arrow-u" data-expanded-icon="arrow-d">
	    <div data-role="collapsible" data-icon="arrow-u">
	        <h2>Users</h2>
	        <ul data-role="listview" data-filter="true" data-filter-theme="c" data-divider-theme="d" data-split-theme="d" data-split-icon="delete">
	            <li><a href="index.html">Adam Kinkaid</a><a href="#" ></a></li>
	            <li><a href="index.html">Alex Wickerham</a><a href="#"></a></li>
	            <li><a href="index.html">Avery Johnson</a><a href="#"></a></li>
	            <li><a href="index.html">Bob Cabot</a><a href="#"></a></li>
	            <li><a href="index.html">Caleb Booth</a><a href="#"></a></li>
	        </ul>
	    </div>
	    <div data-role="collapsible">
	        <h2>Food Items</h2>
	        <ul data-role="listview" data-theme="d" data-divider-theme="d">
	            <li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
	            <li><a href="index.html">
	                <h3>Stephen Weber</h3>
	                <p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
	                <p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
	                <p class="ui-li-aside"><strong>6:24</strong>PM</p>
	            </a></li>
	            <li><a href="index.html">
	                <h3>jQuery Team</h3>
	                <p><strong>Boston Conference Planning</strong></p>
	                <p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
	                <p class="ui-li-aside"><strong>9:18</strong>AM</p>
	            </a></li>
	        </ul>
	    </div>
	</div>
	<div id="form-wrapper">
		<div id="foodForm" style="display:none;">
			<div class="input-form-php">
				<div class="user-form">
					<button id="food-user-add-button" class="add-button">+</button>
				 	<button id="food-user-label-button" class="label-button">Users</button>
					<div class="clearDiv"></div>
					<div id="food-user-list" class="list">
					</div>
				</div>
				<div class="clearDiv"></div>
				<div class="items-form">
					<button id="food-item-add-button" class="add-button">+</button>
					<button id="food-item-label-button" class="label-button">Food Items</button>
					<div class="clearDiv"></div>
					<div id="food-item-list" class="list">
					</div>
				</div>
				<div class="clearDiv"></div>
				<div class="extra-form">
					<div style="float:right;">
						<label for="tipInput">Tip % </label>
						<input id="tipInput" type="text" />
					</div>
					<div class="clearDiv"></div>
					<div style="margin-top:10px;float:right;">
						<label for="taxInput" >Tax % </label>
						<input id="taxInput" type="text" />
					</div>
					<div class="clearDiv"></div>
					<div style="margin-top:10%;">
						<label for="foodSubtotalInput">Subtotal </label>
						<input id="foodSubtotalInput" type="text" />
					</div>
				</div>
				<div class="clearDiv"></div>
				<button id="food-invoice-button" class="invoice-button">Invoice</button>
			</div>
			<div id="food-user-dialog-list" title="Select User">
				<ul>
				</ul>
			</div>
			<div id="food-user-dialog-input" title="Set User Info">
				<label for="food-user-name-input">Name</label><br/>
				<input type="text" name="food-user-name-input" id="food-user-name-input" class="dialog-input"/><br/>
				<label for="food-user-email-input">Email</label><br/>
				<input type="text" name="food-user-email-input" id="food-user-email-input" class="dialog-input"/><br/>
				<label for="food-user-phone-input">Phone</label><br/>
				<input type="text" name="food-user-phone-input" id="food-user-phone-input" class="dialog-input"/>
			</div>
			<div id="food-item-dialog-list" title="Select Food Item">
				<ul>
				</ul>
			</div>
			<div id="food-item-dialog-input" title="Set Food Info">
				<span id='food-item-name-input-span'>
					<label for="food-item-name-input">Name</label><br/>
					<input type="text" name="food-item-name-input" id="food-item-name-input" class="dialog-input"/><br/>
				</span>
				<label for="food-item-price-input">Price</label><br/>
				<input type="text" name="food-item-price-input" id="food-item-price-input" class="dialog-input"/><br/>
				<label for="food-item-quantity-input">Quantity</label><br/>
				<input type="text" name="food-item-quantity-input" id="food-item-quantity-input" class="dialog-input"/>
			</div>
		</div>
		<div class="clearDiv"></div>
		
		
		<div id="rentForm" style="display:none;">
			<div class="title-bar">
				<p>Rent</p>
			</div>
			<div class="input-form">
				<div class="user-form">
					<button id="rent-user-add-button" class="add-button">+</button>
				 	<button id="rent-user-label-button" class="label-button">Users</button>
					<div class="clearDiv"></div>
					<div id="rent-user-list" class="list">
					</div>
				</div>
				<div class="clearDiv"></div>
				<div class="items-form">
					<button id="bill-add-button" class="add-button">+</button>
					<button id="bill-label-button" class="label-button">Bills</button>
					<div class="clearDiv"></div>
					<div id="bill-list" class="list">
					</div>
				</div>
				<div class="clearDiv"></div>
				<div class="extra-form">
					<div>
						<label for="rentInput">Rent </label>
						<input id="rentInput" type="text" />
					</div>
				</div>
				<div class="clearDiv"></div>
				<button id="rent-invoice-button" class="invoice-button">Invoice</button>
			</div>
			<div id="rent-user-dialog-list" title="Select User">
				<ul>
				</ul>
			</div>
			<div id="rent-user-dialog-input" title="Set User Info">
				<label for="rent-user-name-input">Name</label><br/>
				<input type="text" name="rent-user-name-input" id="rent-user-name-input" class="dialog-input"/><br/>
				<label for="rent-user-email-input">Email</label><br/>
				<input type="text" name="rent-user-email-input" id="rent-user-email-input" class="dialog-input"/><br/>
				<label for="rent-user-phone-input">Phone</label><br/>
				<input type="text" name="rent-user-phone-input" id="rent-user-phone-input" class="dialog-input"/>
			</div>
			<div id="bill-dialog-list" title="Select Bill">
				<ul>
				</ul>
			</div>
			<div id="bill-dialog-input" title="Set Bill Info">
				<span id='bill-name-input-span'>
					<label for="bill-name-input">Name</label><br/>
					<input type="text" name="bill-name-input" id="bill-name-input" class="dialog-input"/><br/>
				</span>
				<label for="bill-price-input">Price</label><br/>
				<input type="text" name="bill-price-input" id="bill-price-input" class="dialog-input"/>
			</div>
		</div>
		<div class="clearDiv"></div>
		

		<div id="travelForm" style="display:none;">
			<div id="travel-page">
				<div class="title-bar">
					<p>Travel</p>
				</div>
				<div class="input-form">
					<div class="user-form">
						<button id="travel-user-add-button" class="add-button">+</button>
					 	<button id="travel-user-label-button" class="label-button">Users</button>
						<div class="clearDiv"></div>
						<div id="travel-user-list" class="list">
						</div>
					</div>
					<div class="clearDiv"></div>
					<div class="items-form">
						<button id="travel-item-add-button" class="add-button">+</button>
						<button id="travel-item-label-button" class="label-button">Travel Items</button>
						<div class="clearDiv"></div>
						<div id="travel-item-list" class="list">
						</div>
					</div>
					<div class="clearDiv"></div>
					<div class="extra-form">
						<div>
							<label for="travelPotInput" >Total Pot </label>
							<input id="travelPotInput" type="text" />
						</div>
					</div>
					<div class="clearDiv"></div>
					<button id="travel-invoice-button" class="invoice-button">Invoice</button>
				</div>
				<div id="travel-user-dialog-list" title="Select User">
					<ul>
					</ul>
				</div>
				<div id="travel-user-dialog-input" title="Set Travel Info">
					<label for="travel-user-name-input">Name</label><br/>
					<input type="text" name="travel-user-name-input" id="travel-user-name-input" class="dialog-input"/><br/>
					<label for="travel-user-email-input">Email</label><br/>
					<input type="text" name="travel-user-email-input" id="travel-user-email-input" class="dialog-input"/><br/>
					<label for="travel-user-phone-input">Phone</label><br/>
					<input type="text" name="travel-user-phone-input" id="travel-user-phone-input" class="dialog-input"/>
				</div>
				<div id="travel-item-dialog-list" title="Select Travel Item">
					<ul>
					</ul>
				</div>
				<div id="travel-item-dialog-input" title="Set Travel Item Info">
					<span id='travel-item-name-input-span'>
						<label for="travel-item-name-input">Name</label><br/>
						<input type="text" name="travel-item-name-input" id="travel-item-name-input" class="dialog-input"/><br/>
					</span>
					<label for="travel-item-price-input">Price</label><br/>
					<input type="text" name="travel-item-price-input" id="travel-item-price-input" class="dialog-input"/>
				</div>
				<div id="travel-user-dialog-link" title="">
				</div>
			</div>
			<div id="travel-invoice">
			</div>
		</div>
		<div class="clearDiv"></div>
	</div>
</div>
<!-- SCRIPT FOR THE PAGE AT THE END TO 
	ENSURE THAT ALL ELEMENT ARE PROPERLY LOADED-->
<script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.1.custom.js"></script>
<script type="text/javascript" src="js/person.js"></script>
<script type="text/javascript" src="js/XMLContactParse.js"></script>
<script type="text/javascript" src="js/food.js"></script>
<script type="text/javascript" src="js/rent.js"></script>
<script type="text/javascript" src="js/travel.js"></script>
<script type="text/javascript" src="js/calculations.js"></script>
<script>
function person(name, phone, email)
{
	this.name = name;
	this.phone = phone;
	this.email = email;

}

$(function() {
	
});

function buttonListeners()
{
	$('#nav-bar-radio').buttonset();
	
	$('#nav-bar-radio').change(function() {
		if($('#foodRadio').is(':checked'))
		{
			$('#travelForm').hide();
			$('#rentForm').hide();
			$('#foodForm').show(); 
		}
		else if($('#travelRadio').is(':checked'))
		{
			$('#foodForm').hide();
			$('#rentForm').hide();
			$('#travelForm').show(); 
		}
		else if($('#rentRadio').is(':checked'))
		{
			$('#foodForm').hide();
			$('#travelForm').hide();
			$('#rentForm').show(); 
		}	
	});
	
	$('.add-button').button({
		icons: {
		    primary: "ui-icon-plus"
		  },
		  text: false
	});
	$('.label-button').button();
	$('.invoice-button').button();
}

$(document).ready(function() {
	xmlParse();
	
	buttonListeners();
	foodFormListener();
	rentFormListener();
	travelFormListener();
	
});
</script>
<?php include('footer.php'); ?>