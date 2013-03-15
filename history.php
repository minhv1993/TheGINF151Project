<?php include('header.php');
include('classes/event.class.php');
$xml = simplexml_load_file('xml/history.xml');
$history = new ArrayObject();
$type = '';
foreach($xml->children() as $child) {
	$name = $child->info->name;
	$category = $child->info->category;
	$users = array();
	foreach($child->users->children() as $user) {
		array_push($users, $user);
	}
	$items = array();
	foreach($child->items->children() as $item){
		array_push($items, $item);
	}
	$attr = $child->attributes();
	$event = new Event();
	$event->_construct($name, $users, $items, $child->totalPot, $attr[0], $category);
	$history->append($event);
}
$count = $history->count();
$loe = $history->getArrayCopy();
$historyList = '';
for($i = 0; $i < $count; $i++){
	$users = $loe[$i]->getUsers();
	$items = $loe[$i]->getItems();
	$ustr = '';
	$istr = '';
	foreach($users as $user){
		$ustr .= "[".$user."] ";
	}
	foreach($items as $item){
		$attr = $item->attributes();
		$istr .= $attr[0]." ($".$attr[1].") ";
	}
	$historyList .= '<li>
    	<a href="#viewEvent'.$i.'" data-rel="popup" data-transition="pop" data-position-to="window">'.$loe[$i]->getName().' Event</a>
    	<div id="viewEvent'.$i.'" data-role="popup" data-theme="b" data-overlay-theme="a" data-dismissible="false" data-corners="false">
			<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
			<div class="form-dialog">
				<b><u>'.$loe[$i]->getName().'</u></b><br/>
				<b>Name: </b>'.$loe[$i]->getName().'<br/>
				<b>Date: </b>'.$loe[$i]->getDate().'<br/>
				<b>Total Pot: </b>$'.$loe[$i]->getTotInvoice().'<br/>
				<b>Event Type: </b>'.$loe[$i]->getType().'<br/>
				<b>Users: </b>'.$ustr.'<br/>
				<b>Items: </b>'.$istr.'<br/>
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