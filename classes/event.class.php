<?php
class Event{
	private $type;
	private $users;
	private $items;
	private $totInvoice;
	
	public function _construct($users,$items,$totInvoice,$type){
		$this->users = $users;
		$this->items = $items;
		$this->totInvoice = $totInvoice;
		$this->type = $type;
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
