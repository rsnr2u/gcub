<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;
use App\Libraries\SecurityNotifier;

class ApiAuthFilter implements FilterInterface
{
    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            SecurityNotifier::notify('Missing Authentication Token', [
                'Endpoint' => $request->getUri()->getPath(),
                'IP Address' => $request->getIPAddress(),
                'Method' => $request->getMethod()
            ]);

            return service('response')->setJSON([
                'status' => 'error',
                'message' => 'Authorization token is required'
            ])->setStatusCode(401);
        }

        $token = $matches[1];
        $userModel = new UserModel();
        $user = $userModel->where('auth_token', $token)->first();

        if (!$user) {
            SecurityNotifier::notify('Invalid Authentication Token', [
                'Endpoint' => $request->getUri()->getPath(),
                'IP Address' => $request->getIPAddress(),
                'Token Used' => substr($token, 0, 15) . '...',
                'Method' => $request->getMethod()
            ]);

            return service('response')->setJSON([
                'status' => 'error',
                'message' => 'Invalid authorization token'
            ])->setStatusCode(401);
        }

        $expiry = strtotime($user['token_expiry']);
        if ($expiry < time()) {
            return service('response')->setJSON([
                'status' => 'error',
                'message' => 'Authorization token has expired'
            ])->setStatusCode(401);
        }

        // Add user ID to request for reference in controllers
        $request->userId = $user['id'];
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing
    }
}
