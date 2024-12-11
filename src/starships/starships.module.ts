import { Module } from '@nestjs/common';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
    imports: [CacheModule],
    providers: [StarshipsResolver, StarshipsService]
})
export class StarshipsModule { }
