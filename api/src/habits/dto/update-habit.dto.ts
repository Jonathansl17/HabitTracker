import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {  
    @ApiProperty({
        type: Boolean,
        description: 'The completion status of the habit',
        example: true
    })
    completed: boolean;
}
