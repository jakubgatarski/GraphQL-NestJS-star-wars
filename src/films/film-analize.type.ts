import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class WordCount {
    @Field()
    word: string;

    @Field()
    count: number;
}

@ObjectType()
export class AnalyzeOpeningCrawlResult {
    @Field(() => [WordCount])
    wordCounts: WordCount[];

    @Field(() => [String])
    mostMentionedCharacters: string[];
}
