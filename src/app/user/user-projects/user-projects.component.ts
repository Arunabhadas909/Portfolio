import { Component, OnInit } from '@angular/core';
import { webAllDetails } from 'src/app/interface';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {



  constructor(private service:Service1Service){}

data: webAllDetails  | null = null;

 projects:{title: string; description:string; img:string; url:string } [] = [];

 projectsFound : {title: string; description:string; img:string; url:string } [] = [];




  getProjects()
{

  this.service.getDataWithFallback().subscribe( async (info) =>
    {
      const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.projectsFound= await info.projects;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('projectsFound ',this.projectsFound);
      console.log('data' , data);

    })
}







        ngOnInit()
  {

    // this.service.getDataWithFallback().subscribe( (updatedData) =>
    //   {
    //     this.data = updatedData;
    //      this.projects = updatedData.projects ?? '';

    //     //  this.previewUrl = updatedData.previewUrl;
    //         console.log(this.data);
    //         console.log('projects: '  , this.projects);

    // // console.log('textEntered :' , this.textEntered);
        this.getProjects();
    //   });



    }
}
