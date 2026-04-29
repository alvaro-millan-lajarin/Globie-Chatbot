<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (!session()->get('isLoggedIn')) {
            if ($request->hasHeader('X-Requested-With')) {
                return service('response')->setStatusCode(401)->setJSON(['error' => 'Unauthorized']);
            }
            return redirect()->route('login');
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
