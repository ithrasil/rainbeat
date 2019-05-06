<?php

namespace App\Util\DataAdapter;

final class JamendoEntityTracksAdapter implements DataAdapter
{
    public function adapt($data): array
    {
        if ($data->results == []) return [];
        return $data->results[0]->tracks;
    }
}
