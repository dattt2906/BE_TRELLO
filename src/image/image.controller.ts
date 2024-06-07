import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('api/images')
export class ImageController {
  @Get(':filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = path.join(__dirname, '..', '..', '.public', 'image', filename);

    // Kiểm tra xem tệp tồn tại hay không
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      // Trả về mã lỗi 404 nếu không tìm thấy tệp
      res.status(404).send('File not found');
    }
  }
}