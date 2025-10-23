import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { HabitsService } from './habits.service';
import { Logger } from 'utils/logger';
import { Habit } from './entities/habit.entity';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';


@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService,
    private readonly logger: Logger
  ) {}

  @Post()
  @ApiCreatedResponse({ type: Habit })
  create(@Body() createHabitDto: CreateHabitDto) {
    this.logger.log('Creating habit');
    return this.habitsService.create(createHabitDto);
  }

  @Get()
  @ApiOkResponse({ type: [Habit] })
  findAll() {
    this.logger.log('Finding all habits','HabitsController');
    return this.habitsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Habit })
  findOne(@Param('id') id: string) {
    this.logger.log(`Finding habit with id: ${id}`,'HabitsController');
    return this.habitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Habit })
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    this.logger.log(`Updating habit with id: ${id}`,'HabitsController');
    return this.habitsService.update(id, updateHabitDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Habit })
  remove(@Param('id') id: string) {
    this.logger.log(`Removing habit with id: ${id}`,'HabitsController');
    return this.habitsService.remove(id);
  }
}
