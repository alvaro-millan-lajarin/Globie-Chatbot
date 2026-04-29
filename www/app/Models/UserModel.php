<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users'; //tabla
    protected $primaryKey = 'id';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';
    protected $useSoftDeletes = false; //lo dejas en borrado, no lo veras(esto si lo dejaras en true)

    protected $allowedFields = ['email', 'username', 'password', 'profile_pic', 'created_at', 'updated_at']; //(campos que se pueden editar)

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $validationRules = [
        'email'    => 'required|valid_email|is_unique[users.email]|salle_email',
        'password' => 'required|min_length[7]|regex_match[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/]',
    ];

    protected $validationMessages = [

        'email' => [
            'required'    => 'The email field is required.',
            'valid_email' => 'Please provide a valid email address.',
            'is_unique'   => 'This email is already registered.',
        ],
        'password' => [
            'required'   => 'The password field is required.',
            'min_length' => 'The password must be at least 6 characters long.',
        ],

    ];

    protected $skipValidation = false;
}