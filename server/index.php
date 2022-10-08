<?php
define('APP_DIR', $_SERVER['DOCUMENT_ROOT']);

require_once './Router/Request.php';
require_once './Router/Router.php';
require_once './routes/routes.php';

$router = new Router(new Request());

apiRequests($router);
