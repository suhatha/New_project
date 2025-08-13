<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
// OR, for all localhost ports (not recommended for production):
// 'allowed_origins' => ['http://localhost:*'], // Your frontend origin (Vite/React)

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => ['Authorization', 'Content-Type'], // Optional: expose auth headers to JS

    'max_age' => 0,

    'supports_credentials' => true, // Important if using cookies or auth tokens

];
