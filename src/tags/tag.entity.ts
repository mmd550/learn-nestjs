import { Post } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 256,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 512,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // When we delete a tag, we don't want to delete it from the database, we want to set the deletedAt column
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Post, (post) => post.tags, {
    // witout this we can not delete a tag if it is associated with a post.
    // with this we can delete a tag and all the relations in the post-tag table associated with it will be deleted.
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
