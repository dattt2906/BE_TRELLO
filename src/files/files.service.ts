import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entity/file.entity';
import { FileDto } from './dto/file.dto';
import { TableService } from 'src/table/table.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private tableService:TableService
    
  ) {}

  async create(file:FileDto):Promise<File>{
    const rowDetailFind= await this.tableService.findRowDetailById(file.rowId)
    if(!rowDetailFind){
        throw new NotFoundException("rowdetail does not find")
    }

    const newFile = new File()
    newFile.filename=file.filename
    newFile.imageFile= file.imageFile
    newFile.rowDetail=rowDetailFind
    return await this.filesRepository.save(newFile)




  }
  async findFileById(fileId:number):Promise<File>{

    return await this.filesRepository.findOne({

        where:{fileId:fileId},
        relations:{
            rowDetail:{
                files:true
            }
        }
    })
  }

  
}