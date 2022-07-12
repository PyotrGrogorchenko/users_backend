export class UserDto {
  _id = ''
  email = '' 
  username = ''
  dateBirth = null
  gender = null
  avatarId = null

  constructor(model: any) {
    this._id = model._id
    this.email = model.email
    this.username = model.username
    this.dateBirth = model.dateBirth
    this.gender = model.gender
    this.avatarId = model.avatar
  }

  getKey() {
    return { _id: this._id }
  }

}
