import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResolver } from './films.resolver';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [FilmsService, FilmsResolver],
})
export class FilmsModule {}