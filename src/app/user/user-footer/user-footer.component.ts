import { Component } from '@angular/core';
import { userData } from 'src/app/interface';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent {


  constructor(private service: Service1Service){}
  
   showModal=false;
   name:string ="";
   email:string ="";
   message:string ="";
  
  
  dataSent=false;
  
  responseFromBackend="";
  //  responseFromBankend: userData = 
  //  {
  //   userName: this.name,
  //   email:this.email,
  //   message:this.message
  //  }
    saveDetails()
    {
  
     
    const sendUserData: userData = 
   {
    userName: this.name,
    email:this.email,
    message:this.message
   };
  
  
        this.service.postUserData('/addUser', sendUserData).subscribe({
  
          // response =>
          //   {
          //     // this.showModal=true;
          //     console.log('response' ,response.message);
          //     // this.responseFromBankend=response.msg;
          //   },
          
          next:async (response:any)=> {
  
            this.responseFromBackend = await response.msg;
            console.log(this.responseFromBackend);
            this.showModal=true;
             this.dataSent =true;
          },
          
  
  
          error: (error) => 
            {
              console.log('error', error);
            }
    })
    console.log(this.showModal);
   
  
     console.log('msg:', this.responseFromBackend);
    }

}
