import { RowDetail } from 'src/table/rowDetails.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  fileId: number;

  @Column()
  filename: string;

  @Column()
  imageFile:string

  @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(()=> RowDetail, (rowdetail)=> rowdetail.files)
    @JoinColumn({name:"rowId"})
    rowDetail:RowDetail
}