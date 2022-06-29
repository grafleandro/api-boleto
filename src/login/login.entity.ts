import { Usuario } from "src/usuario/usuario.entity"
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'uuid'})
    @Generated("uuid")
    uuid: string

    @Column({ length: 100})
    email: string

    @Column()
    senha: string

    @Column()
    usua_id: number

    @Column({default: () => 'NOW()'})
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @OneToOne(type => Usuario, login => Login, {eager: true})
    @JoinColumn({name: "usua_id", referencedColumnName: "usua_id"})
    pessoa: Usuario
}