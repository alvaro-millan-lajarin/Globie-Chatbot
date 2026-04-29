<?php

namespace App\Services;

use CodeIgniter\HTTP\Files\UploadedFile;
use RuntimeException;

class UploadFiles implements FileUploaderInterface
{
    private const UPLOADS_DIR     = FCPATH . 'uploads/profile_pictures/';
    private const ALLOWED_MIMES   = ['image/jpeg', 'image/png'];
    private const MAX_FILE_SIZE   = 2048000; // 2 MB in bytes
    private const DEFAULT_PICTURE = 'uploads/profile_pictures/default.png';

    public function upload(?UploadedFile $file): string
    {
        if (!$file || !$file->isValid() || $file->hasMoved()) {
            return $this->getDefault();
        }

        if ($file->getSize() > self::MAX_FILE_SIZE) {
            throw new RuntimeException("The file exceeds the maximum allowed size.");
        }

        if (!in_array($file->getMimeType(), self::ALLOWED_MIMES, true)) {
            throw new RuntimeException("File type not allowed.");
        }

        $newName = $file->getRandomName();
        $file->move(self::UPLOADS_DIR, $newName);

        return 'uploads/profile_pictures/' . $newName;
    }

    public function getDefault(): string
    {
        return self::DEFAULT_PICTURE;
    }
}