import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  Permalink:string = " ";
  imgUrl: any = './assets/placeholder-image.jpg';
  selectedIgm : any;
  dataCategory!: any;
  postForm! : FormGroup;
  stringCt = "";
  constructor(private categoryService :CategoriesService , private fb:FormBuilder) { 
    this.postForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
        ]),
      ],
      Permalink: ['', Validators.required,],
      excerpt: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(50),
      ]),],
      category: [null,Validators.required],
      postImg: [null,Validators.required],
      content: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(50),
      ]),]
    });
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
    console.log(this.postForm.value);
    if (this.postForm.valid) {
      console.log("Form is valid!");
    } else {
      console.log("Form is invalid. Errors:", this.postForm.errors);
    }
  }
}
