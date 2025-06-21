export interface ReadLink
{
    title:string;
    description:string;
    img:string;
    url:string;

    
}

export interface skillsSchema
{
    name:string;
    img:string;
}

export interface userData
{
    userName:string,
    email:string,
    message:string
}

export interface projectSchema
{

    
    projectLink:string,
    projectDescription:string,

}


export interface webAllDetails
{
    username:string,
    designation:string,
    previewUrl: string | ArrayBuffer | null,
    textEntered: string,
    skills:{ name:string; img:string;} [],
    projects:{title: string; description:string; img:string; url:string } [],
    coverLettertextEntered: string,

}


export interface AllDetails
{

    username:string,
    designation:string,

    previewUrl: string | ArrayBuffer | null,
    mimeType:string,
    textEntered: string,
    skills:{ name:string; img:string;} [],
    projects:{title: string; description:string; img:string; url:string } [],
    coverLettertextEntered: string,

}