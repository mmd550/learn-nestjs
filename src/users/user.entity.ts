import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Post, (post) => post.author, {
    // if we delete a user, we delete all posts
    cascade: ['remove'],
  })
  posts?: Post[];
}

// export class CreateUserDto {

//   @IsNotEmpty()
//   @MinLength(8)
//   @Matches(/^(?=.*[A-za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
//     message:
//       'Minimum 8 characters, at least one letter, one number and one special character',
//   })
//   password: string;
// }
