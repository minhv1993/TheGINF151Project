<?php include('header.php');
include('classes/contact.class.php');
$xml = simplexml_load_file("xml/contacts.xml");
$contacts = new ArrayObject();
foreach($xml->children() as $child){
	$contact = new Contact();
	$contact->_construct($child->name);
	$contact->setPhone($child->phone);
	$contact->setEmail($child->email);
	$contacts->append($contact);
}
$count = $contacts->count();
$loc = $contacts->getArrayCopy();
$contacts->uasort('contactsCmp');
$loc = $contacts->getArrayCopy();
$contactsList = '';
$i = 1;
foreach($loc as $contact){
	$contactsList .= '<li>
    	<a href="#editContact'.$i.'" data-rel="popup" data-transition="pop" data-position-to="window">'.$contact->getName().'</a>
    	<div id="editContact'.$i.'" data-role="popup" data-theme="b" data-overlay-theme="a" data-dismissible="false" data-corners="false">
			<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
			<form id="contact-form" class="form-dialog contact-form">
				<h3>Edit Contact</h3>
				<input type="hidden" name="id" id="id" value="'.$contact->getName().'">
				<label for="name" class="ui-hidden-accessible">Name:</label>
				<input type="text" name="name" id="name" value="'.$contact->getName().'" placeholder="Name" data-theme="b" data-clear-btn="true">
				<label for="phone" class="ui-hidden-accessible">Phone:</label>
				<input type="text" name="phone" id="phone" value="'.$contact->getPhone().'" placeholder="Phone" data-theme="b" data-clear-btn="true">
				<label for="email" class="ui-hidden-accessible">Email:</label>
				<input type="text" name="email" id="email" value="'.$contact->getEmail().'" placeholder="Email" data-theme="b" data-clear-btn="true">
				<button type="submit" name="subtype" data-theme="b" value="edit">Edit</button>
			</form>
    	</div>
    </li>';
	$i++;
} ?>
<div data-role="header" data-theme="b" data-position="fixed">
	<a href="index.php" class="ui-btn-left ui-icon-nodisc" data-iconshadow="false" data-rol="button" data-inline="true" data-iconpos="notext" data-icon="home" data-theme="b" data-corners="false"></a>
	<span class="ui-title">Contacts</span>
	<a href="#addContact" class="ui-btn-right ui-icon-nodisc" data-iconshadow="false" data-role="button" data-rel="popup" data-transition="pop" data-inline="true" data-position-to="window" data-iconpos="notext" data-icon="plus" data-theme="b" data-corners="false"></a>
    <div data-role="popup" id="addContact" data-theme="b" data-overlay-theme="a" data-dismissible="false" data-corners="false">
		<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
        <form class="form-dialog contact-form">
              <h3>Add Contact</h3>
              <label for="name" class="ui-hidden-accessible">FirstName:</label>
              <input type="text" name="name" id="name" value="" placeholder="Name" data-theme="b" data-clear-btn="true">
              <label for="phone" class="ui-hidden-accessible">Phone:</label>
              <input type="text" name="phone" id="phone" value="" placeholder="Phone" data-theme="b" class="ui-n" data-clear-btn="true">
              <label for="email" class="ui-hidden-accessible">Email:</label>
              <input type="text" name="email" id="email" value="" placeholder="Email" data-theme="b" class="ui-n" data-clear-btn="true">
              <button type="submit" name="subtype" data-theme="b" data-corners="false" value="add">Add</button>
        </form>
    </div>
</div>
<div data-role="content">
	<ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="true" data-corners="false">
		<?php echo$contactsList;?>
	</ul>
</div>

<script src="js/contacts.jquery.js" type="text/javascript"></script>
<?php include('footer.php'); ?>
