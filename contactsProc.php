<?php
include('xml/xmlCRUD.php');
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$subtype = $_POST['subtype'];
$attrToEdit = array('name','phone','email');
$edits = array($name,$phone,$email);
if(strcmp($subtype, 'edit') == 0){
	$id = $_POST['id'];
	$parent = new SimpleXMLElement('xml/contacts.xml', null, true);
	$child = $parent->xpath('/contacts/contact[name="'.$id.'"]');
	$child[0]->name = $name;
	$child[0]->phone = $phone;
	$child[0]->email = $email;
	header("Content-type: text/xml");
	echo $parent->asXML('xml/contacts.xml');
}else if(strcmp($subtype, 'add') == 0){
	$parent = new SimpleXMLElement('xml/contacts.xml', null, true);
	$child = $parent->addChild('contact');
	$child->addChild('name', $name);
	$child->addChild('phone', $phone);
	$child->addChild('email', $email);
	echo $parent->asXML('xml/contacts.xml');
}
?>