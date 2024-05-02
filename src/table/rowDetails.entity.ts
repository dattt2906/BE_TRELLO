import { ColumnEntity } from "src/table/column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { RowEntity } from "./row.entity";
import { RowDto } from "./dto/row.dto";
@Entity()
export class RowDetail {
    @PrimaryGeneratedColumn()
    rowDetailsId: number
    @Column()
    content: string;
    @Column({default:null})
    description:string
    @Column({default:null})
    activity:string;
   

    @OneToOne(() => RowEntity, (row) => row.rowDetail)
    @JoinColumn({name:"rowId"})
    row:RowEntity

}