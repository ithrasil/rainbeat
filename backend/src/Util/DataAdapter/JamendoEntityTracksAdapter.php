<?php

namespace App\Util\DataAdapter;

class JamendoEntityTracksAdapter implements IDataAdapter {
    public function adapt($data) {
        if($data->results == []) return [];
        return $data->results[0]->tracks;
    }
}