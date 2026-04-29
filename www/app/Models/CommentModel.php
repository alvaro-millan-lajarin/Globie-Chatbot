<?php

namespace App\Models;

use CodeIgniter\Model;

class CommentModel extends Model
{
    protected $table          = 'comments';
    protected $primaryKey     = 'id';
    protected $useAutoIncrement = true;
    protected $returnType     = 'array';
    protected $allowedFields  = ['user_id', 'post_id', 'content'];
    protected $useTimestamps  = true;
    protected $updatedField   = '';

    public function getCommentsWithUser(int $postId): array
    {
        return $this->db->table('comments c')
            ->select('c.id, c.user_id, c.content, c.created_at, u.username, u.profile_pic AS profile_picture')
            ->join('users u', 'u.id = c.user_id')
            ->where('c.post_id', $postId)
            ->orderBy('c.created_at', 'ASC')
            ->get()
            ->getResultArray();
    }

    public function getCommentWithUser(int $id): ?array
    {
        $row = $this->db->table('comments c')
            ->select('c.id, c.user_id, c.content, c.created_at, u.username, u.profile_pic AS profile_picture')
            ->join('users u', 'u.id = c.user_id')
            ->where('c.id', $id)
            ->get()
            ->getRowArray();
        return $row ?: null;
    }
}
