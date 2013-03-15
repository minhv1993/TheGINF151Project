<?php
class Event{
	private $name;
	private $eDate;
	private $type;
	private $users;
	private $items;
	private $totInvoice;
	
	public function _construct($name,$users,$items,$totInvoice,$date,$type){
		$this->name = $name;
		$this->users = $users;
		$this->items = $items;
		$this->totInvoice = $totInvoice;
		$this->eDate = $date;
		$this->type = $type;
	}
	
	public function getName(){
		return $this->name;
	}
	
	public function setname($name){
		$this->name = $name;
	}
	
	public function getDate(){
		return $this->eDate;
	}
	
	public function setDate($date){
		$this->eDate = $date;
	}
	
	public function getType(){
		return $this->type;
	}
	
	public function setType($type){
		$this->type = $type;
	}
	
	public function getUsers(){
		return $this->users;
	}
	
	public function setUsers($users){
		$this->users = $users;
	}
	
	public function getItems(){
		return $this->items;
	}
	
	public function setItems($items){
		$this->items = $items;
	}
	
	public function getTotInvoice(){
		return $this->totInvoice;
	}
	
	public function setTotInvoice($totInvoice){
		$this->totInvoice = $totInvoice;
	}
}
