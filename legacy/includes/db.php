<?php
// Import database connection constants from file
require 'db_creds.php';

// Function to connect to database and set some defaults
function my_sqli_connect(){
	if($db=mysqli_connect(
		defined('MYSQLI_H')?MYSQLI_H:'localhost',
		defined('MYSQLI_U')?MYSQLI_U:'root',
		defined('MYSQLI_P')?MYSQLI_P:'',
		defined('MYSQLI_D')?MYSQLI_D:'database',
		defined('MYSQLI_O')?MYSQLI_O:3306
	)) {
		// Set default options for all DB connections here
		$db->query("SET time_zone='".$db->escape_string(date('P'))."'");
	}
	return $db??NULL;
}
