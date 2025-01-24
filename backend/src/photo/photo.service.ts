import { Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, existsSync } from 'fs';
import { appendFile, mkdir, readdir, rm } from 'fs/promises';
import { join } from 'path';
import EnvironmentVariables from 'src/environment-variables';
import 'multer';

@Injectable()
export class PhotoService {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  async get(id: string) {
    const path = join(this.config.get('FILES_STORE') || process.cwd(), id);
    if (!existsSync(path)) return;

    const files = await readdir(path);
    if (files.length === 0) return;

    const readStream = createReadStream(join(path, files[0]));
    return new StreamableFile(readStream);
  }

  async upload({ id, file }: { id: string; file: Express.Multer.File }) {
    const path = join(this.config.get('FILES_STORE') || process.cwd(), id);
    await rm(path, { recursive: true, force: true });
    await mkdir(path);
    await appendFile(join(path, file.originalname), file.buffer);
  }

  async delete(id: string) {
    const path = join(this.config.get('FILES_STORE') || process.cwd(), id);
    await rm(path, { recursive: true, force: true });
  }
}
