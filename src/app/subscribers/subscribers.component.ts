import { Component, OnInit } from '@angular/core';
import { SubService } from '../services/sub.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  dataSub! : any;
  constructor(private sub:SubService) { }

  ngOnInit(): void {
    this.sub.loadData().subscribe(data =>{
      this.dataSub = data;
      console.log(this.dataSub)
    })
  }
  deletesub(idSub:string){
    this.sub.DeleteSub(idSub)
  }

}
