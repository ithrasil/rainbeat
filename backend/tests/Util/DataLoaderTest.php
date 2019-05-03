<?php

namespace test\Util;

use App\Domain\ValueObject\Requirements;
use App\Util\DataAdapter\IDataAdapter;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Repository\FilesystemRepository;
use App\Util\DataLoader\DataLoader;
use App\Util\DataLoader\HttpManager;

final class DataLoaderTest extends KernelTestCase
{
    /** @var DataLoader|null $dataLoader */
    private $dataLoader;

    protected function setUp()
    {
        $kernel = self::bootKernel();
        $this->dataLoader = $kernel->getContainer()->get('App\Util\DataLoader\DataLoader');
    }

    /**
     * @test
     * @dataProvider tracksForGiveQueryProvider
     * @param IDataAdapter $adapter
     * @param Requirements $requirements
     * @param array $expected
     */
    public function getTracksForGivenQuery(IDataAdapter $adapter, Requirements $requirements, array $expected): void
    {
        $this->dataLoader->getHttpManager()->setAdapter($adapter);
        $this->assertEquals($expected, $this->dataLoader->getGenericContent($requirements));
    }

    public function tracksForGiveQueryProvider(): array
    {
        return [
            [
                new SoundcloudEntityAdapter(),
                new Requirements(ApiProviders::SOUNDCLOUD, OutputType::TRACK, 'tiesto'),
                [
                    0 => [
                        'big_artwork' => 'https://i1.sndcdn.com/artworks-000113418206-u74dpc-t500x500.jpg',
                        'artist_name' => 'Musical Freedom',
                        'source' => 'soundcloud',
                        'stream' => 'https://api.soundcloud.com/tracks/200843678/stream?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv',
                        'name' => 'Martin Garrix & Tiësto - The Only Way Is Up [OUT NOW]',
                        'id' => '200843678',
                    ],
                    1 => [
                        'big_artwork' => 'https://i1.sndcdn.com/artworks-000110214611-yz333i-t500x500.jpg',
                        'artist_name' => 'Musical Freedom',
                        'source' => 'soundcloud',
                        'stream' => 'https://api.soundcloud.com/tracks/196156839/stream?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv',
                        'name' => 'Tiesto & KSHMR -  Secrets feat. Vassy (Original Mix)[OUT NOW]',
                        'id' => '196156839',
                    ],
                    2 => [
                        'big_artwork' => 'https://i1.sndcdn.com/artworks-000125963811-ldu0z9-t500x500.jpg',
                        'artist_name' => 'Musical Freedom',
                        'source' => 'soundcloud',
                        'stream' => 'https://api.soundcloud.com/tracks/218663070/stream?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv',
                        'name' => 'Tiësto & The Chainsmokers - Split (Only U) [OUT NOW]',
                        'id' => '218663070',
                    ]
                ]
            ]
        ];
    }
}
