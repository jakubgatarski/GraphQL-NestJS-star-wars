import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { REDIS_HOST, REDIS_PORT, CACHE_TTL } from 'src/app.consts';

@Module({
  imports: [
    NestCacheModule.register({
      host: REDIS_HOST,
      port: REDIS_PORT,
      ttl: CACHE_TTL,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
