import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  dataPost!: any;
  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe((data)=>{
        this.dataPost= data
    })
  }
  ondelete(imgPath:string,id:string){
   
    this.postService.DeleteImage(imgPath,id)
  }

  onFeatured(id:string , value: boolean){
    const featureData = {
      isFeatured : value
    }

    this.postService.markFeature(id,featureData);
  }
}
