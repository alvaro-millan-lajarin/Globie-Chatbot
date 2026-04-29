<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\ResponseInterface;

class ChatbotController extends Controller
{
    // Inside Docker: www/ maps to /var/www/, so python/ is at /var/www/python/
    private const SCRIPT = '/var/www/python/chatbot.py';

    public function index(): string
    {
        return view('chatbot/index');
    }

    public function send(): ResponseInterface
    {
        $message = trim($this->request->getPost('message') ?? '');

        if ($message === '') {
            return $this->response->setJSON(['error' => 'Empty message'])->setStatusCode(400);
        }

        $reply = $this->callPythonChatbot($message);

        return $this->response->setJSON(['reply' => $reply]);
    }

    private function callPythonChatbot(string $message): string
    {
        $script  = escapeshellarg(self::SCRIPT);
        $input   = escapeshellarg($message);
        $output  = shell_exec("python3 {$script} {$input} 2>&1");

        if ($output === null || $output === '') {
            return 'The chatbot did not respond. Is Python installed in the container?';
        }

        $decoded = json_decode(trim($output), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return 'Python error: ' . trim($output);
        }

        return $decoded['reply'] ?? 'No reply from chatbot.';
    }
}
