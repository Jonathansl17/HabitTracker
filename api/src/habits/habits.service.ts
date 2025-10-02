import { Injectable } from '@nestjs/common'; 
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { createSupabaseClient } from 'utils/supabase-utils';
import { TABLE_NAMES } from 'utils/supabase-utils';

const supabase = createSupabaseClient();


@Injectable()
export class HabitsService {
  async create(createHabitDto: CreateHabitDto) {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).insert(createHabitDto);
    if (error) {
      throw new Error(`Error creating habit: ${error.message}`);
    }
    return 'Habit created successfully';
  }

  async findAll() {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).select('*');
    if (error) {
      throw new Error(`Error fetching habits: ${error.message}`);
    }
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).select('*').eq('id', id);
    if (error) {
      throw new Error(`Error fetching habit: ${error.message}`);
    }
    return data; 
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).update(updateHabitDto).eq('id', id);
    if (error) {
      throw new Error(`Error updating habit: ${error.message}`);
    }
    return 'Habit updated successfully';
  }

  async remove(id: number) {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).delete().eq('id', id);
    if (error) {
      throw new Error(`Error removing habit: ${error.message}`);
    }
    return 'Habit removed successfully';
  }
}
