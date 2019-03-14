<?php
class Server {
  private $db;
  private $secret;

  function __construct() {
    $this->db = new Database();
  }

  function handleRequest($request, $client_identifier) {
    if (!in_array('action', $request)) {
      throw new Exception(json_encode(array('error' => "Invalid request - no action.")));
    }
    $session = $this->getSessionByToken($request, $client_identifier);
    switch($request['action']) {
      default:
        throw new Exception(json_encode(array('error' => "Invalid request - unknown action.")));
    }
    return $request;
  }

  private function getSessionByToken($request, $client_identifier) {
    if (!in_array('token', $request)) {
      return array();
    }
    $token = explode($request['token'], '.');
    if (len($token) == 2) {
      list($session_id, $hash) = $token;
      if ($hash == $this->sign($session_id, $client_identifier)) {
        return $this->db->getSession($session_id);
      }
    }
    return array();
  }

  private function sign($session_id, $client_identifier) {
    return hash_hmac('sha512', $session_id.$client_identifier, Config::SBMD_SECRET, true);
  }
}
