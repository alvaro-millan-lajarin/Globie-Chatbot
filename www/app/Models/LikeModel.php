<?php

namespace App\Models;

use CodeIgniter\Model;

class LikeModel extends Model
{
    protected $table          = 'likes';
    protected $primaryKey     = 'id';
    protected $useAutoIncrement = true;
    protected $returnType     = 'array';
    protected $allowedFields  = ['user_id', 'post_id'];
    protected $useTimestamps  = true;
    protected $updatedField   = '';
}