import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import Post from "@models/Post"

@Entity()
@Unique('UNIQUE_USERNAME', ['username'])
@Unique('UNIQUE_MAIL', ['mail'])
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    mail: string

    @Column()
    fullname: string

    @Column()
    dateOfBirth: Date

    @Column()
    password: string

    @OneToMany(() => Post, (post) => post.user, { onDelete: "CASCADE"})
    posts: Array<Post>

    @ManyToMany(() => Post, (post) => post.upvotedUsers, { onDelete: "CASCADE"})
    @JoinTable()
    upvotedPosts: Array<Post>

    @ManyToMany(() => Post, (post) => post.downvotedUsers, { onDelete: "CASCADE"})
    @JoinTable()
    downvotedPosts: Array<Post>
}