import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm";
@Entity()
export class Noti {
    @PrimaryGeneratedColumn()
    notiId: number
    @Column()
    notiContent:string
    @Column({default:false})
    isRead:boolean

    
    @ManyToOne(()=>User,(user)=>user.noties)
    @JoinColumn({name:'userId'})
    user:User
   


}