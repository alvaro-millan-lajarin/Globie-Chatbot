<?php

namespace App\Validation;

class CustomRules
{


    public function salle_email(string $email): bool{
        if (str_ends_with($email, '@students.salle.url.edu') || str_ends_with($email, '@ext.salle.url.edu') || str_ends_with($email, '@salle.url.edu')) {
            return true;
        }else{
            return false;
        }

    }


}