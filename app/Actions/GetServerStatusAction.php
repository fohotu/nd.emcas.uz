<?php 

namespace App\Actions;

class GetServerStatusAction
{
    public function execute()
    {
        return [
            'status' => 'online',
            'php_version' => PHP_VERSION,
            'time' => now()->toTimeString(),
        ];
    }
}

?>