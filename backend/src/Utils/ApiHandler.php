<?php

namespace App\Utils;

class ApiHandler {

    private $curl;

    public function __construct()
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $this->curl = $ch;
    }

    public function exec(string $url) {
        curl_setopt($this->curl, CURLOPT_URL, $url);
        return curl_exec($this->curl);
    }

}