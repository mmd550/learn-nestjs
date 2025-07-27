import { Column, Entity } from 'typeorm';

@Entity()
export class User {
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
  })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
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
