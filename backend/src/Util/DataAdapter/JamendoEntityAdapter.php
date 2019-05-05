<?php

namespace App\Util\DataAdapter;

final class JamendoEntityAdapter implements IDataAdapter {
    public function adapt($data): array {
        return $data->results;
    }
}
