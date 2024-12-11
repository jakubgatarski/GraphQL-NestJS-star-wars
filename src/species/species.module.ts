import { Module } from '@nestjs/common';
import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
    imports: [CacheModule],
    providers: [SpeciesResolver, SpeciesService]
})
export class SpeciesModule { }
