import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';
import { File } from './entity/file.entity';
import { Path } from '@nestjs/config';
import { FileDto } from './dto/file.dto';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: '.public/image', // Thư mục lưu trữ file
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return {
        message: 'File uploaded successfully',
        filename: file.filename,
        originalname:file.originalname
      };
    }
    @Post("create")
    async create(@Body() file:FileDto):Promise<File>{
        return await this.filesService.create(file)
    }
    @Get("find-file-by-id/:fileId")
    async findFileById(@Param("fileId") fileId:number):Promise<File>{
        return await this.filesService.findFileById(fileId)
    }


  }

