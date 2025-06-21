import { Component, OnInit } from '@angular/core';
import { webAllDetails } from 'src/app/interface';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.css']
})
export class UserSkillsComponent implements OnInit{

  constructor(private service: Service1Service){}


    skills:{ name:string; img:string;} [] =[];

  skillsFound :{name:string; img:string}[] = [];
    data: webAllDetails | null = null;



    getSkills()
{

  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.skillsFound = await  info.skills;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('skillsFound ',this.skillsFound);
      console.log('data' , data);

    })
}




      ngOnInit()
  {

    this.service.data$.subscribe( (updatedData) =>
      {
        this.data = updatedData;
         this.skills = updatedData.skills ?? '';

        //  this.previewUrl = updatedData.previewUrl;
            console.log(this.data);
            console.log('skills : '  , this.skills);

    // console.log('textEntered :' , this.textEntered);

      });

      this.getSkills();
    
    }
}
