<?php

namespace App\Util\DataAdapter;

class JamendoEntityAdapter implements IDataAdapter {
    public function adapt($data) {
        return $data->results;
    }
}