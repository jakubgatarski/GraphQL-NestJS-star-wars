import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsResolver } from './planets.resolver';
import { CacheModule } from 'src/cache/cache.module';

@Module({
    imports: [CacheModule],
    providers: [PlanetsService, PlanetsResolver],
})
export class PlanetsModule { }