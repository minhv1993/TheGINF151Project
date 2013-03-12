<?php include('header.php');
include('classes/event.class.php');
$xml = simplexml_load_file('xml/history.xml');
$history = new ArrayObject();
foreach($xml->children() as $child) {
	$users = new ArrayObject();
	foreach($child->users->children() as $user) {
		$users->append($user);
	}
	$items = new ArrayObject();
	foreach($child->items->children() as $item){
		$items->append($item);
	}
	$event = new Event();
	$event->_construct($users, $items, $child->totalPot);
	$history->append($event);
}
$count = $history->count();
$loe = $history->getArrayCopy();
$historyList = '';
for($i = 0; $i < $count; $i++){
	$historyList .= '<li>
    	<a href="#viewEvent'.$i.'" data-rel="popup" data-transition="pop" data-position-to="window">Temp Name</a>
    	<div id="viewEvent'.$i.'" data-role="popup" data-theme="b" data-overlay-theme="a" data-dismissible="false" data-corners="false">
			<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
			<div class="form-dialog">
				<h3>Edit Contact</h3>
				<input type="hidden" name="id" id="id" value="'.$loe[$i]->getTotInvoice().'">
				<label for="name" class="ui-hidden-accessible">Name:</label>
				<input type="text" name="name" id="name" value="'.$loe[$i]->getTotInvoice().'" placeholder="Name" data-theme="b" data-clear-btn="true">
				<label for="phone" class="ui-hidden-accessible">Phone:</label>
				<input type="text" name="phone" id="phone" value="'.$loe[$i]->getTotInvoice().'" placeholder="Phone" data-theme="b" data-clear-btn="true">
				<label for="email" class="ui-hidden-accessible">Email:</label>
				<input type="text" name="email" id="email" value="'.$loe[$i]->getTotInvoice().'" placeholder="Email" data-theme="b" data-clear-btn="true">
			</div>
    	</div>
    </li>';
}
?>
<div data-role="header" data-theme="b" data-position="fixed">
	<a href="index.php" class="ui-btn-left ui-icon-nodisc" data-iconshadow="false" data-rol="button" data-inline="true" data-iconpos="notext" data-icon="home" data-theme="b" data-corners="false"></a>
	<span class="ui-title">History</span>
</div>
<div data-role="content">
	<ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="true" data-corners="false">
		<?php echo $historyList; ?>
	</ul>
</div>
<?php include('footer.php');?>