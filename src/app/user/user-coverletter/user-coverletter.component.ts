import { Component, OnInit } from '@angular/core';
import { webAllDetails } from 'src/app/interface';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-user-coverletter',
  templateUrl: './user-coverletter.component.html',
  styleUrls: ['./user-coverletter.component.css']
})
export class UserCoverletterComponent  implements OnInit{


constructor(private service:Service1Service){}

data :webAllDetails | null = null;


coverlettertextEntered: string='';

gotcoverlettertextEntered :string ='';

  getCoverLetterText()
{

  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.gotcoverlettertextEntered= await info.coverLettertextEntered;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('Cover Letter Text',this.gotcoverlettertextEntered);
      console.log('data' , data);

    })
}




         ngOnInit()
  {

    this.service.data$.subscribe( (updatedData) =>
      {
        this.data = updatedData;
         this.coverlettertextEntered = updatedData.coverLettertextEntered ?? '';

        //  this.previewUrl = updatedData.previewUrl;
            console.log(this.data);
            console.log('Cover Letter text: '  , this.coverlettertextEntered);

    // console.log('textEntered :' , this.textEntered);

      });

      this.getCoverLetterText();
    }
}
