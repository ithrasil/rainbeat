<?php

namespace App\Util\DataAdapter;

final class JamendoEntityTracksAdapter implements IDataAdapter {
    public function adapt($data): array {
        if($data->results == []) return [];
        return $data->results[0]->tracks;
    }
}
