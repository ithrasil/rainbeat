<?php

namespace test\Util;

use App\Domain\ValueObject\Requirements;
use App\Util\DataAdapter\IDataAdapter;
use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;
use App\Util\DataLoader\RequestType;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Repository\Repository;
use App\Util\DataLoader\DataLoader;
use test\Util\Fake\HttpClientFake;

final class DataLoaderTest extends KernelTestCase
{
    /** @var DataLoader|null $dataLoader */
    private $dataLoader;

    private $expectedValues;

    protected function setUp()
    {
        $kernel = self::bootKernel();
        /** @var Repository $repository */
        $repository = $kernel->getContainer()->get('App\Repository\Repository');
        $httpClientFake = new HttpClientFake();
        $this->expectedValues = $kernel->getProjectDir() . '/tests/Util/ExpectedValues/';
        $httpClientFake->setPath($kernel->getProjectDir());
        $this->dataLoader = new DataLoader($repository, $httpClientFake);
    }

    /**
     * @test
     * @dataProvider tracksByGivenQueryProvider
     * @dataProvider artistsByGivenQueryProvider
     * @dataProvider playlistsByGivenQueryProvider
     * @param $filename
     * @param Requirements $requirements
     */
    public function getApiObjectsByQuery(string $filename, Requirements $requirements): void
    {
        $expected = json_decode(file_get_contents($this->expectedValues . $filename), true);
        $given = $this->dataLoader->getGenericContent($requirements);
        $this->assertEquals($expected, $given);
    }

    /**
     * @test
     * @dataProvider tracksByGivenQueryProvider
     * @dataProvider artistsByGivenQueryProvider
     * @dataProvider playlistsByGivenQueryProvider
     * @param $filename
     * @param Requirements $requirements
     */
    public function getApiObjectsByQueryFromEntityObjects(string $filename, Requirements $requirements): void
    {
        $expected = json_decode(file_get_contents($this->expectedValues . $filename), true);
        $given = $this->dataLoader->getGenericContent($requirements);
        $this->assertEquals($expected, $given);
    }

    public function tracksByGivenQueryProvider(): array
    {
        return [
            [
                OutputType::TRACK . '__' . ApiProviders::SOUNDCLOUD . '__tiesto__.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::TRACK, 'tiesto'),
            ],
            [
                OutputType::TRACK . '__' . ApiProviders::JAMENDO . '__tiesto__.json',
                new Requirements(ApiProviders::JAMENDO, OutputType::TRACK, 'tiesto'),
            ],
        ];
    }

    public function artistsByGivenQueryProvider(): array
    {
        return [
            [
                OutputType::ARTIST . '__' . ApiProviders::SOUNDCLOUD . '__tiesto__.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::ARTIST, 'tiesto'),
            ],
        ];
    }

    public function playlistsByGivenQueryProvider(): array
    {
        return [
            [
                OutputType::PLAYLIST . '__' . ApiProviders::SOUNDCLOUD . '__tiesto__.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::PLAYLIST, 'tiesto'),
            ],
            [
                OutputType::PLAYLIST . '__' . ApiProviders::JAMENDO . '__tiesto__.json',
                new Requirements(ApiProviders::JAMENDO, OutputType::PLAYLIST, 'tiesto'),
            ],
            [
                OutputType::PLAYLIST . '__' . ApiProviders::SOUNDCLOUD . '__ncs__.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::PLAYLIST, 'ncs'),
            ],
        ];
    }

    /**
     * @test
     * @dataProvider tracksByGivenArtistIdProvider
     * @dataProvider tracksByGivenPlaylistIdProvider
     * @param $filename
     * @param Requirements $requirements
     */
    public function getTracksByApiObjectId(string $filename, Requirements $requirements): void
    {
        $expected = json_decode(file_get_contents($this->expectedValues . $filename), true);
        $given = $this->dataLoader->getTracks($requirements);
        $this->assertEquals($expected, $given);
    }

    public function tracksByGivenArtistIdProvider(): array
    {
        return [
            [
                OutputType::ARTIST_TRACK . '__' . ApiProviders::SOUNDCLOUD . '__' . RequestType::TRACK . '__1165244.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::ARTIST_TRACK, RequestType::TRACK, '1165244'),
            ],
        ];
    }

    public function tracksByGivenPlaylistIdProvider(): array
    {
        return [
            [
                OutputType::PLAYLIST_TRACK . '__' . ApiProviders::SOUNDCLOUD . '__' . RequestType::TRACK . '__362913791.json',
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::PLAYLIST_TRACK, RequestType::TRACK, '362913791'),
            ],
        ];
    }
}
