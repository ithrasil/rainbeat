<?php

namespace App\Util\Unifier;

use App\Util\DataLoader\DataLoader;

abstract class AbstractUnifier implements IUnifier {
    use CommonUnifierMethods;

    /**
     * @var DataLoader $loader
     */
    protected $loader;

    protected function simpleUnify($data, $unifying_method): array {
        $unified = array();

        foreach ($data as $track) {
            array_push($unified, $unifying_method($track));
        }

        return $unified;
    }

    protected function extendedUnify($data, $get_url_by_chunk, $unifying_method): array {
        $unified = array();

        foreach ($data as $data_chunk) {
            $data_chunk_subelements = $this->loader->getExternalContent($get_url_by_chunk($data_chunk));

            if(count($data_chunk_subelements) > 0) {
                array_push($unified, $unifying_method($data_chunk, $data_chunk_subelements));
            }
        }

        return $unified;
    }

}