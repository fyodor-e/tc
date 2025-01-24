import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';

@Controller('products/:id/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.photoService.upload({
      id,
      file,
    });
  }

  @Get()
  async getFile(@Param('id') id: string) {
    return this.photoService.get(id);
  }

  @Delete()
  async deleteFile(@Param('id') id: string) {
    await this.photoService.delete(id);
  }
}
