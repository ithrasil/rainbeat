<?php

namespace App\Util\DataAdapter;

final class JamendoEntityAdapter implements DataAdapter {
    public function adapt($data): array {
        return $data->results;
    }
}
