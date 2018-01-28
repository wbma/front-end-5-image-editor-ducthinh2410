import {Injectable} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class ImageService {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement = new Image();
  imageData: any;
  pixels: any;
  numPixels: number;
  functions: Object = {};


  constructor() {
  }

  setCanvas = (c) => {
    this.canvas = c;
    this.context = this.canvas.getContext('2d');
  };

  filetoCanvas = (fileElement) => {
    if (fileElement.target.files && fileElement.target.files[0]) {

      let reader = new FileReader();

      reader.addEventListener("loadend", () => {
        this.image.src = reader.result;
        this.image.addEventListener("load", this.resetImage);
      })
      
      reader.readAsDataURL(fileElement.target.files[0]);
    }
  };

  resetImage = () => {
    // set canvas width and height to be the same as of image
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;

    // use drawImage method to draw image to canvas
     this.context.drawImage(this.image, 0,0 );

    // Uncomment the following
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixels = this.imageData.data;
    this.numPixels = this.imageData.width * this.imageData.height;
  };

  applyFilters = () => {
    this.resetImage();

    for (let i in this.functions) {
      if (this.functions.hasOwnProperty(i)) {
        this.functions[i]();
      }
    }

  }
}
