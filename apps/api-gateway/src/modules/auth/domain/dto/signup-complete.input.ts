import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class SignupCompleteInput {
    @Field()
    token: string;

    @Field()
    @MinLength(6)
    password: string;
}
