<?php include('header.php');?>
<div data-role="header" data-theme="b" data-position="fixed">
	<span class="ui-title"></span>
	<a href="#homeSettings" class="ui-btn-right ui-icon-nodisc" data-iconshadow="false" data-role="button" data-rel="popup" data-transition="pop" data-inline="true" data-position-to="window" data-iconpos="notext" data-icon="gear" data-theme="b" data-corners="false"></a>
	<div data-role="popup" id="homeSettings" data-overlay-theme="a" data-dismissible="false" data-theme="b" class="ui-content" data-corners="false">
		<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
		<a href="#">Account Settings</a>
	</div>
</div>
<div data-role="content">
	<div id="app-name">
		<h1>BillSplit</h1>
		<h5>An easier way to to split the bill</h5>
	</div>	
	<a href="quick-select.html" rel="external" data-role="button" data-theme="b" data-corners="false">Quick Event</a>
	<a href="history.php" data-role="button" data-theme="b" data-corners="false">History</a>
	<a href="contacts.php" rel="external" data-role="button" data-theme="b" data-corners="false">Contacts</a>
</div>
<?php include('footer.php'); ?>
