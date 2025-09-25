import { Injectable } from '@nestjs/common'; 
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SECRET = process.env.SUPABASE_SECRET ?? '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);


@Injectable()
export class HabitsService {
  async create(createHabitDto: CreateHabitDto) {
    const { data, error } = await supabase.from('habits').insert(createHabitDto);
    if (error) {
      throw new Error(`Error creating habit: ${error.message}`);
    }
    return 'Habit created successfully';
  }

  async findAll() {
    const { data, error } = await supabase.from('habits').select('*');
    if (error) {
      throw new Error(`Error fetching habits: ${error.message}`);
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} habit`;
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return `This action updates a #${id} habit`;
  }

  remove(id: number) {
    return `This action removes a #${id} habit`;
  }
}
