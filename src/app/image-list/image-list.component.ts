import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})

export class ImageListComponent implements OnInit {
  images!: any[];
  searchQuery!: string;
  imagesFound = false;
  searching = false;

  constructor(private imageService: ImageService) {}

  handleSuccess(data:any) {
    this.imagesFound = true;
    this.images = data.hits;
    console.log(data.hits);
  }

  handleError(error: any) {
    console.log(error);
  }

 

  ngOnInit() {
  }

}
