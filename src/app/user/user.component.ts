import { Component, ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transpileModule } from 'typescript';

// import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs';



import { ViewChild } from '@angular/core';
import { Service1Service } from '../service1.service';
import { AllDetails, webAllDetails } from '../interface';
import { det } from 'mathjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {




  constructor(private service:Service1Service , private routes: Router){}


  title = 'admin';

  textEntered: string='';
  isSaved=false;

  showDiv = 'div1';

  hovered = false;

  goToHome= false;

isClickedUploadButton = false;  
showEditButton=false;


showSidebar = false;

isIconClicked = false;


Projects: number[] =[1];

projectsCount = 1;

files:{name: string ; url:string ; thumbnail: string; type:string} [] = [];
// projectClasses=['col-2','border','rounded','project-box','text-center']

// Projects:{}

previewUrl: string | ArrayBuffer | null = null;

  
  gotPreviewUrl: string | ArrayBuffer | null = null;



renderProject = false;

  lastUserData:webAllDetails ={

    username:"",
    designation:"",
    previewUrl:null,
    textEntered:"",
    skills:[],
    projects:[],
    coverLettertextEntered:""
  }

 @ViewChild('home', { static: true }) home!: ElementRef;
@ViewChild('main', { static: true }) main!: ElementRef;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

storeText(event:Event)
{

  var value = (event?.target as HTMLTextAreaElement).value;
  this.textEntered = value;
  console.log(this.textEntered);
}

onMouseEnter()
{
  this.hovered=true;
  this.showEditButton=true;

}
onMouseLeave()
{
   this.hovered= false;
   this.showEditButton=false;
}

showProject()
{
  // if(this.renderProject == false)
  //   {
    // this.projectsCount++;
    this.Projects;
    // .push(this.projectsCount);
    // }
}


  // onProjectSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (!input.files?.length) return;

  //   const file = input.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.files.push({
  //       name: file.name,
  //       url: reader.result as string,
  //     });
  //   };

  //   reader.readAsDataURL(file); // read file as base64
  // }


   async onProjectSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    for (const file of Array.from(input.files)) {
      const type = file.type;

      if (type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            name: file.name,
            url: reader.result as string,
            thumbnail: reader.result as string,
            type,
          });
        };
        reader.readAsDataURL(file);

        console.log(reader);
      } 
      
      // else if (type === 'application/pdf') {
      //   const reader = new FileReader();
      //   reader.onload = async () => {
      //     const pdfData = new Uint8Array(reader.result as ArrayBuffer);
      //     const pdf: PDFDocumentProxy = await getDocument({ data: pdfData }).promise;
      //     const page = await pdf.getPage(1);

      //     const canvas = document.createElement('canvas');
      //     const ctx = canvas.getContext('2d')!;
      //     const viewport = page.getViewport({ scale: 1.5 });

      //     canvas.height = viewport.height;
      //     canvas.width = viewport.width;

      //     await page.render({ canvasContext: ctx, viewport }).promise;

      //     const thumbnail = canvas.toDataURL();

      //     this.files.push({
      //       name: file.name,
      //       url: reader.result as string,
      //       thumbnail,
      //       type,
      //     });
      //   };
      //   reader.readAsArrayBuffer(file);
      // }
      
      else {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            name: file.name,
            url: reader.result as string,
            thumbnail: 'assets/file-icon.png', // fallback icon
            type,
          });
        };
        reader.readAsDataURL(file);
      }
    }

    this.showProject();
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }


base64ToFile(base64String: string, filenameWithoutExt: string): File {
  // Example: data:image/png;base64,.....
  const [metadata, base64Data] = base64String.split(',');
  const mimeMatch = metadata.match(/data:(image\/[a-zA-Z0-9.+-]+);base64/);

  if (!mimeMatch) throw new Error('Invalid base64 format');

  const mimeType = mimeMatch[1]; // e.g., image/png
  const extension = mimeType.split('/')[1]; // e.g., png

  // Convert base64 to binary data (Blob)
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);

    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  // Construct filename with correct extension
  const fullFileName = `${filenameWithoutExt}.${extension}`;

  return new File([blob], fullFileName, { type: mimeType });
}






sendToDatabase()
{
  const data  = localStorage.getItem('webAllDetails');



    if (!data) return;

  const details: webAllDetails = JSON.parse(data);

  console.log('details' ,details);

const formData = new FormData();

if (typeof details.previewUrl === 'string') {
  const file = this.base64ToFile(details.previewUrl, 'myImage');

  
  formData.append('image', file);


  const sendData  = {
  previewUrl: file,
  coverLettertextEntered: details.coverLettertextEntered,
  projects: details.projects,
  skills: details.skills,
  textEntered: details.textEntered,
  }



  formData.append('data', JSON.stringify({
  coverLettertextEntered: details.coverLettertextEntered,
  projects: details.projects,
  skills: details.skills,
  textEntered: details.textEntered,
}));
this.service.passDataToDatabase('/data', formData).subscribe(

        (response) =>
          {
              console.log(response);
          },
        (error) =>
          {
            console.log(error);
          }

      );

       


}

  this.reloadComponent();

// formData.append('data', JSON.stringify({
//   coverLettertextEntered: details.coverLettertextEntered,
//   projects: details.projects,
//   skills: details.skills,
//   textEntered: details.textEntered,
// }));


// this.service.passDataToDatabase('/dataSelected', sendData).subscribe(

//         (response) =>
//           {
//               console.log(response);
//           },
//         (error) =>
//           {
//             console.log(error);
//           }

//       );



  // Convert remaining fields to JSON string
  // const jsonDetails = {
  //   coverLettertextEntered: details.coverLettertextEntered,
  //   projects: details.projects,
  //   skills: details.skills,
  //   textEntered: details.textEntered,
  // };

  // formData.append('data', JSON.stringify(jsonDetails));



  // if(data)
  //   {

  //     const details : webAllDetails = JSON.parse(data);


  //     const imageFile = new FormData();

  //     details.previewUrl = imageFile;
  //     this.service.passDataToDatabase('/dataSelected', details).subscribe(

  //       (response) =>
  //         {
  //             console.log(response);
  //         },
  //       (error) =>
  //         {
  //           console.log(error);
  //         }

  //     );

    }



    reloadComponent() {
      const currentUrl = this.routes.url;
      this.routes.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.routes.navigate([currentUrl]);

        this.isSaved= false;
    });
  }
    

// this.service.passDataToDatabase('/dataSelected', details);

// }


// getLastUserData()
// {

//   this.service.getDataFromDatabase('/data').subscribe( async (userData: AllDetails) =>{

//       if(userData) 
//         {
//             this.gotPreviewUrl = await userData.previewUrl;
//         }


//   })
// }





 

ngAfterViewInit() {
  const headerHeight = this.home.nativeElement.offsetHeight;
  this.main.nativeElement.style.paddingTop = `${headerHeight/2}px`;

  // this.main.nativeElement.style.marginTop = `${headerHeight}px`;
}
}
