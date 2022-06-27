export class UserDto {
  id = ''
  email = '' 
  
  constructor(model: any) {
    this.id = model._id
    this.email = model.email
  }
}
