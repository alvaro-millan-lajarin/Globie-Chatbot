<?php

namespace App\Services;

use CodeIgniter\HTTP\Files\UploadedFile;

interface FileUploaderInterface
{
    public function upload(?UploadedFile $file): string;
    public function getDefault(): string;
}
