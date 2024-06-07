import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { RowEntity } from "./row.entity";
import { RowDto } from "./dto/row.dto";
import { File } from "src/files/entity/file.entity";
@Entity()
export class RowDetail {
    @PrimaryGeneratedColumn()
    rowDetailsId: number
    @Column()
    content: string;
    @Column({default:null})
    description:string
    @Column({default:null})
    attachment:string
    @Column({default:null})
    activity:string;
    @Column({default:null})
    deadline:string

   

    @OneToOne(() => RowEntity, (row) => row.rowDetail, {onDelete:'CASCADE'})
    @JoinColumn({name:"rowId"}) 
    row:RowEntity

    @OneToMany(()=> File, (file)=> file.rowDetail)
    files:File[]

}