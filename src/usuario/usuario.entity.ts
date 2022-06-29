import { Login } from "src/login/login.entity"
import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    usua_id: number

    @Column({type: 'uuid'})
    @Generated("uuid")
    usua_uuid: string

    @Column({ length: 50})
    usua_nome: string

    @Column({ length: 100})
    usua_email: string

    @Column()
    usua_dataNascimento: Date

    @Column({default: () => 'NOW()'})
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @OneToOne(type => Login, pessoa => Usuario, {
        cascade: ['insert', 'update']
    })
    login: Login
}