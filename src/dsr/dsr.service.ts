import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dsr } from './model/dsr.model';
import { CreateDsrDto } from './dto/create-dsr.dto';  // Assuming you have this DTO
import { NotFoundException } from '@nestjs/common';
import { UpdateDsrDto } from './dto/update-dsr.dto';

@Injectable()
export class DsrService {
  
  constructor(
    @InjectModel(Dsr)
    private readonly dsrModel: typeof Dsr,
  ) {}

  // Create DSR (Daily Status Report)
  async createDsr(createDsrDto: CreateDsrDto, userId: number): Promise<Dsr> {
    const { content, hours, date } = createDsrDto;

    // Perform validation to ensure hours do not exceed 8 per day
    if (hours > 8) {
      throw new Error('Cannot log more than 8 hours in a day');
    }

    const newDsr = await this.dsrModel.create({
      userId,  
      content,  
      hours,  
      date,  
    });

    return newDsr;
  }

  async updateDsr(userId: number, dsrId: number, updateDsrDto: UpdateDsrDto): Promise<Dsr> {
    // Find the DSR by ID
    const dsr = await this.dsrModel.findOne({ where: { id: dsrId } });

    if (!dsr) {
      throw new NotFoundException('DSR not found');
    }

    // Check if the user is the one who created the DSR
    if (dsr.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this DSR');
    }

    // Check if the total hours exceed the limit (8 hours)
    const newHours = updateDsrDto.hours ? updateDsrDto.hours : dsr.hours;
    if (newHours > 8) {
      throw new ForbiddenException('You cannot add more than 8 hours for a day');
    }

    // Update the DSR
    await dsr.update(updateDsrDto);

    return dsr;
  }
}
