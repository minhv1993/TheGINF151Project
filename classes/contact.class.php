<?php
class Contact {
	private $name;
	private $phone;
	private $email;
	
	public function _construct($name){
		$this->name = $name;
	}
	
	public function setName($name){
		$this->name = $name;
	}
	
	public function getName(){
		return $this->name;
	}
	public function setPhone($phone){
		$this->phone = $phone;
	}
	
	public function getPhone(){
		return $this->phone;
	}
	
	public function setEmail($email){
		$this->email = $email;
	}
	
	public function getEmail(){
		return $this->email;
	}
}

function contactsCmp($c1, $c2){
	$result = strcmp($c1->getName(), $c2->getName());
	return $result;
}
?>