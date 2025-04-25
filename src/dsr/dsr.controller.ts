import { Controller, Post, Body, Req, UseGuards, Put, Param, Request } from '@nestjs/common';
import { DsrService } from './dsr.service';
import { CreateDsrDto } from './dto/create-dsr.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';  
import { User } from 'src/users/user.model';
import { UpdateDsrDto } from './dto/update-dsr.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users/api/v1')
export class DsrController {
  constructor(private readonly dsrService: DsrService) {}

  @Post('dsr')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new DSR' })
  @ApiResponse({ status: 201, description: 'DSR successfully created.' })
  async createDsr(@Body() createDsrDto: CreateDsrDto, @Request() req) {
    const userId = req.user.id;  
    return this.dsrService.createDsr(createDsrDto, userId);
  }

  @UseGuards(JwtAuthGuard) 
  @Put(':dsrId')
  async updateDsr(
    @Param('dsrId') dsrId: number,
    @Body() updateDsrDto: UpdateDsrDto
    // @GetUser() user: User, 
  ) {
    // return this.dsrService.updateDsr(user.id, dsrId, updateDsrDto);
  }
}


