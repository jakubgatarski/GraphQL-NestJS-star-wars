import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FilmsModule } from './films/films.module';
import { CacheModule } from './cache/cache.module';
import { SpeciesModule } from './species/species.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
        }),
        FilmsModule,
        CacheModule,
        SpeciesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }