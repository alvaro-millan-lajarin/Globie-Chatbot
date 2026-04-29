<?php

namespace App\Models;

use CodeIgniter\Model;

class PostModel extends Model
{
    protected $table          = 'posts';
    protected $primaryKey     = 'id';
    protected $useAutoIncrement = true;
    protected $returnType     = 'array';
    protected $allowedFields  = ['user_id', 'content', 'image'];
    protected $useTimestamps  = true;

    public function getPostsWithDetails(int $currentUserId): array
    {
        $builder = $this->db->table('posts p');
        $builder->select('p.id, p.user_id, p.content, p.image, p.created_at, u.username, u.profile_pic AS profile_picture');
        $builder->join('users u', 'u.id = p.user_id');
        $builder->orderBy('p.created_at', 'DESC');
        $posts = $builder->get()->getResultArray();

        $likeModel    = new LikeModel();
        $commentModel = new CommentModel();

        foreach ($posts as &$post) {
            $post['likes_count']    = $likeModel->where('post_id', $post['id'])->countAllResults();
            $post['comments_count'] = $commentModel->where('post_id', $post['id'])->countAllResults();
            $post['user_liked']     = $likeModel->where(['post_id' => $post['id'], 'user_id' => $currentUserId])->countAllResults() > 0;
            $post['comments']       = $commentModel->getCommentsWithUser($post['id']);
        }

        return $posts;
    }
}