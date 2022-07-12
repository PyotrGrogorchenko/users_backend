export class ImageDto {
  type = ''
  image = {
    data: null,
    contentType: ''
  }

  constructor(model: any) {
    this.type = model.type
    this.image = model.image
  }
}
