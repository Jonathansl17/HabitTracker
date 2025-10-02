import { Injectable } from '@nestjs/common'; 
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { createSupabaseClient } from 'utils/supabase-utils';
import { TABLE_NAMES } from 'utils/supabase-utils';
import { Habit } from './entities/habit.entity';

const supabase = createSupabaseClient();


@Injectable()
export class HabitsService {
  async create(createHabitDto: CreateHabitDto) {
    const { data, error } = await supabase
    .from(TABLE_NAMES.HABITS)
    .insert(createHabitDto)
    .select("*")
    .single();
    if (error) {
      throw new Error(`Error creating habit: ${error.message}`);
    }
    return data;
  }

  async findAll(): Promise<Habit[]> {
    const { data, error } = await supabase.from(TABLE_NAMES.HABITS).select('*');
    if (error) {
      throw new Error(`Error fetching habits: ${error.message}`);
    }
    return data;
  }

  async findOne(id: number): Promise<Habit> {
    const { data, error } = await supabase
    .from(TABLE_NAMES.HABITS)
    .select('*')
    .eq('id', id)
    .single();
    if (error) {
      throw new Error(`Error fetching habit: ${error.message}`);
    }
    return data; 
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    const { data, error } = await supabase
    .from(TABLE_NAMES.HABITS)
    .update(updateHabitDto)
    .eq('id', id)
    .select("*")
    .single();
    if (error) {
      throw new Error(`Error updating habit: ${error.message}`);
    }
    return data;
  }

  async remove(id: number): Promise<string> {
    const { data, error } = await supabase
    .from(TABLE_NAMES.HABITS)
    .delete()
    .eq('id', id);
    if (error) {
      throw new Error(`Error removing habit: ${error.message}`);
    }
    return 'Habit removed successfully';
  }
}
 