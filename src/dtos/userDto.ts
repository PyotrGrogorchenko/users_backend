export class UserDto {
  _id = ''
  email = '' 
  username = ''
  dateBirth = null
  gender = null
  avatar = null

  constructor(model: any) {
    this._id = model._id
    this.email = model.email
    this.username = model.username
    this.dateBirth = model.dateBirth
    this.gender = model.gender
    this.avatar = model.avatar
  }

  getKey() {
    return { _id: this._id }
  }

}
