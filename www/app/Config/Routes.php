<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/',             'ChatbotController::index');
$routes->get('chatbot',       'ChatbotController::index');
$routes->post('chatbot/send', 'ChatbotController::send');
