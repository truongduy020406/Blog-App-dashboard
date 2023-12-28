import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  Permalink:string = "";
  imgUrl: any = './assets/placeholder-image.jpg';
  selectedIgm : any;
  dataCategory!: any;
  postForm! : FormGroup;
  stringCt = "";
  post : any ;
  docId: string = "";
  
  formStatus : string = "Add New"
  constructor(private categoryService :CategoriesService , private fb:FormBuilder , private postService: PostsService ,
    private route :ActivatedRoute) { 
      

    this.route.queryParams.subscribe(val =>{
      this.docId = val['id']
      if(this.docId){
        this.postService.loadOneData(val['id']).subscribe(post =>{
          this.post = post
          console.log(this.post.postImgPath)
          this.postForm = this.fb.group({
            title: [this.post.title,Validators.compose([Validators.required,Validators.minLength(10),]),],
            Permalink: [this.post.title.replace(/\s/g, "-"), Validators.required,],
            excerpt: [this.post.excerpt,Validators.compose([Validators.required,Validators.minLength(50),]),],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
            postImg: ['',Validators.required],
            content: [this.post.content,Validators.compose([Validators.required,Validators.minLength(50),]),]
          });
  
          this.imgUrl = this.post.postImgPath
          this.formStatus = "Edit"
          
        })
      }else{
        this.postForm = this.fb.group({
          title: ['',Validators.compose([Validators.required,Validators.minLength(10),]),],
          Permalink: ['', Validators.required,],
          excerpt: ['',Validators.compose([Validators.required,Validators.minLength(50),]),],
          category: [null,Validators.required],
          postImg: [null,Validators.required],
          content: ['',Validators.compose([Validators.required,Validators.minLength(50),]),]
        });
      }
    } )
    
    
  }
 
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((data) => {
      this.dataCategory = data
     })
  }

  onTitelChange($event: any) {
    let title = $event.target.value;
    this.postForm.get('Permalink')?.setValue(title.replace(/\s/g, "-"));
  }

  showPreview($event:any){
    const reader = new FileReader();
    reader.onload =(e)=>{
      this.imgUrl = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectedIgm = $event.target.files[0]
  }

  onSubmit(): void {
    
    const splitted = this.postForm.value.category.split("-")
    const postData: Post = {
      title: this.postForm.value.title,
      permalink : this.postForm.value.Permalink,
      category :{
        categoryId:splitted[0],
        category:splitted[1]
      },
      postImgPath:"",
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views: 0 ,
      status: "new",
      createdAt: new Date()
    }
    this.postService.UploadImg(this.selectedIgm, postData,this.formStatus,this.docId)
    
    this.postForm.reset();
    this.imgUrl =  './assets/placeholder-image.jpg';
  }

  
}
