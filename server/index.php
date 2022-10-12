<?php

use Router\Request;
use Router\Router;

define('APP_DIR', $_SERVER['DOCUMENT_ROOT']);

require_once './Router/Request.php';
require_once './Router/Router.php';
require_once './routes/routes.php';
require_once './functions/cors.php';

cors();

$router = new Router(new Request());

apiRequests($router);
