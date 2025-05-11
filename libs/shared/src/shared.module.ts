import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AppLogger } from './logger/logger.service';

@Module({
  providers: [SharedService, AppLogger],
  exports: [SharedService, AppLogger],
})
export class SharedModule { }
