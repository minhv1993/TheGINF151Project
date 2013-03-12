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
$historyList
?>
<div data-role="header" data-theme="b" data-position="fixed">
	<a href="index.php" class="ui-btn-left ui-icon-nodisc" data-iconshadow="false" data-rol="button" data-inline="true" data-iconpos="notext" data-icon="home" data-theme="b" data-corners="false"></a>
	<span class="ui-title">History</span>
</div>
<div data-role="content">
	<ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="true" data-corners="false">
	</ul>
</div>
<?php include('footer.php');?>