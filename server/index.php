<?php

require_once './Router/Request.php';
require_once './Router/Router.php';
require_once './routes/index.php';

$router = new Router(new Request());

apiRequests($router);
