import { Module } from '@nestjs/common';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { CacheModule } from 'src/cache/cache.module';

@Module({
    imports: [CacheModule],
    providers: [VehiclesResolver, VehiclesService]
})
export class VehiclesModule { }
