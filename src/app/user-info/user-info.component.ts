import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  images: any[] | undefined;
  imagesFound = false;
  searching = false;

  handleSuccess(data:any) {
    this.imagesFound = true;
    this.images = data.hits;
    console.log(data.hits);
  }

  handleError(error:any) {
    console.log(error);
  }

  constructor(private imageService: ImageService) { }

  searchImages() {
      return this.imageService.getUser().subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => (this.searching = false)
      );


  }

  ngOnInit() {
    this.searchImages();
  }


}
