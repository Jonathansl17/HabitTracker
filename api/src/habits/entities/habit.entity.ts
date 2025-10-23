import { ApiProperty } from '@nestjs/swagger';

    
export class Habit {
    @ApiProperty({
        type: String,
        description: 'The unique identifier of the habit (UUID)', 
        example: '550e8400-e29b-41d4-a716-446655440000' 
    })
    id: string; //UUID

    @ApiProperty({
        type: String,
        description: 'The name of the habit',
        example: 'Exercise' 
    })
    name: string;

    @ApiProperty({
        type: Boolean,
        description: 'Indicates whether the habit is completed',
        example: false
    })
    completed: boolean;
}
