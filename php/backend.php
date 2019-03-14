<?php
require('Config.php');
require('Server.php');
require('Database.php');

if (Config::DEBUG) {
	error_reporting(E_ALL);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
		$sbmd_server = new Server();
		$client_identifier = $_SERVER['REMOTE_ADDR'].'_'.$_SERVER['HTTP_USER_AGENT'];
		$request = json_decode(file_get_contents('php://input'), true);
		if (is_array($request)) {
			try {
				$ret = $sbmd_server->handleRequest($request, $client_identifier);
				echo json_encode($ret);
				return;
			} catch (Exception $e) {
				header('HTTP/1.1 400 BAD REQUEST');
				if (Config::DEBUG) {
					echo $e->getMessage();
				}
			}
		} else {
			header('HTTP/1.1 400 BAD REQUEST');
			if (Config::DEBUG) {
				json_encode(array('error' => "Invalid request body."));
			}
		}
	} else {
		header('HTTP/1.1 400 BAD REQUEST');
		if (Config::DEBUG) {
			json_encode(array('error' => "Invalid request headers."));
		}
	}
} else {
	header('HTTP/1.1 400 BAD REQUEST');
	if (Config::DEBUG) {
		json_encode(array('error' => "Invalid request method."));
	}
}
