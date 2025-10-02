import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Logger } from 'utils/logger';

@Controller('habits')
export class HabitsController {
  constructor(
    private readonly habitsService: HabitsService,
    private readonly logger: Logger
  ) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    this.logger.log('Creating habit');
    return this.habitsService.create(createHabitDto);
  }

  @Get()
  findAll() {
    this.logger.log('Finding all habits','HabitsController');
    return this.habitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Finding habit with id: ${id}`,'HabitsController');
    return this.habitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    this.logger.log(`Updating habit with id: ${id}`,'HabitsController');
    return this.habitsService.update(+id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Removing habit with id: ${id}`,'HabitsController');
    return this.habitsService.remove(+id);
  }
}
