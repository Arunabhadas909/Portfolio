import { Component, DoCheck, OnInit } from '@angular/core';
import { AllDetails, webAllDetails } from 'src/app/interface';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-user-intro',
  templateUrl: './user-intro.component.html',
  styleUrls: ['./user-intro.component.css']
})
export class UserIntroComponent implements OnInit{

  constructor(private service: Service1Service){};

  data : webAllDetails | null = null ;

  newData : AllDetails |null = null;

  previewUrl : string|ArrayBuffer |null = null;

  textEntered = "";

  gotPreviewUrl: string |ArrayBuffer |null = null;
  gotTextEntered = "";


  username ="";
  designation ="";


getIntro()
{

  this.service.getDataWithFallback().subscribe( async (info) =>
    {
      const data = await info;
      const base64 : string| ArrayBuffer | null = await info.previewUrl;
      const mimeType = await info.mimeType;
      this.gotTextEntered = await data.textEntered;
      this.username = await data.username;
      this.designation = await data.designation;

      this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      
      console.log('goPreviewUrl' ,this.gotPreviewUrl);
      console.log('base64' ,base64);
      console.log('data' , data);

    })
}




  ngDoCheck() {


    // console.log(this.service.storetextEntered);
  }





  ngOnInit()
  {

    // this.service.getDataWithFallback().subscribe( (updatedData) =>
    //   {
    //     this.data = updatedData;
    //      this.textEntered = updatedData.textEntered ?? '';

    //      this.previewUrl = updatedData.previewUrl;
    //         console.log(this.data);
    //         console.log('textEntered :' , this.textEntered);

    // // console.log('textEntered :' , this.textEntered);

    this.getIntro();

    //   })
    // console.log(this.data);

    // console.log('textEntered :' , this.textEntered);


  //   this.textEntered = this.data.textEntered ?? '';


  



  }
}
