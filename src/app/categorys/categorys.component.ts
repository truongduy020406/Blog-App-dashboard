import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {
  CategoryArray :any | undefined;
  formCategory: string | undefined = '';
  formStatus : string = 'Add';
  categoryId!: string;
  constructor(private categoryService : CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(data =>{
        this.CategoryArray = data
        console.log(this.CategoryArray)
    })
  }
  onSubmit(formdata:any){

    let categoryData:Category = { 
      category:formdata.value.category
    }
    if(this.formStatus === "Add"){
      this.categoryService.saveData(categoryData)
      formdata.reset();
    }else if(this.formStatus === "Edit"){
        this.categoryService.updateData(this.categoryId,categoryData)
        formdata.reset();
    }
  }

  onEdit(category:string , id:string){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id
  }

  onDelete(id:string){
    this.categoryService.deteleData(id)
  }
}
