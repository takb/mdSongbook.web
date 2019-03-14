<?php
class Database extends mysqli {
  function __construct() {
    parent::__construct('genkidelic.de.mysql', 'genkidelic_de', 'VMjpjBSh', 'genkidelic_de');
    $this->set_charset('utf8');
  }

  function __destruct() {
    $this->close();
  }

  function getSession($session_id) {
    return array();
  }
}
