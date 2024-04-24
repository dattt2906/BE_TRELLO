import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { ColumnEntity } from "./column.entity";


@Entity()
export class RowEntity {
    @PrimaryGeneratedColumn()
    rowId: number;
    @Column()
    content: string;
    @Column({default:null})
    sort:number;

    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => ColumnEntity, (col) => col.rows)
    @JoinColumn({ name: 'columnId' })
    cols: ColumnEntity;

}

