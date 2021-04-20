import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { DiscordGithubGuard } from 'src/auth/discordGithub.strategy';
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Post()
  @ApiSecurity('token')
  @UseGuards(DiscordGithubGuard)
  create(@Body() body: GithubDTO) {
    return this.githubService.createGithub(body);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.githubService.findOne(id);
  }

  @Put(':id')
  @UseGuards(DiscordGithubGuard)
  @HttpCode(200)
  @ApiSecurity('token')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() body: GithubDTO) {
    return this.githubService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(DiscordGithubGuard)
  @ApiSecurity('token')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.githubService.remove(id);
  }
}
