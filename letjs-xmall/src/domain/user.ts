import _ from 'lodash'
import { GenderCh, GenderTitle, Role } from '@/config/userConst'
export type AuthList = Array<string>
export type RoleType =
  | 'admin'
  | 'editor'
  | 'developer'
  | 'operator'
  | 'customer'
// domain层
export class User {
  id: number
  name: string
  avatar: string
  email: string
  gender: number
  role: RoleType
  constructor(user: User) {
    // Object.assign(this, user)
    this.id = user.id
    this.name = user.name
    this.gender = user.gender
    this.role = user.role
    this.email = user.email
    this.avatar = user.avatar
  }
  static createEmptyUser(): User {
    const user = new User({
      id: -1,
      name: '',
      gender: 0,
      avatar: '',
      email: '',
      genderCh: '',
      genderTitle: '',
      role: '',
      roleName: '',
      isLogin: false,
    })
    return user
  }
  get isLogin() {
    return this.id > 0
  }
  get genderCh() {
    return GenderCh[this.gender]
  }
  get genderTitle() {
    return GenderTitle[this.gender]
  }
  get roleName() {
    return Role[this.role]
  }
}
