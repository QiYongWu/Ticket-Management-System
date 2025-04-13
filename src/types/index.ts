export interface FormData {
    username: string
    email: string
    phoneNumber: string
    password: string
  }    //sign_up data type

export interface LoginForm {
  username: string
  password: string
}

export interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export interface TicketInfo {
  "feelec_template_id": number,   //id
  "WorkOrderHeading": string,     //标题
  "WorkOrderContent": string,  //内容
  "Priority": number,     //优先级 3->0   低 -》 高
  "contact_person": string,   //联系人
  "contact_number": string,   //联系电话
  "pubdate": string,  //上传时间
  "handler_id": null,     //处理人的id
  "state": number            //状态码
}

export interface TicketAttachmentInfo{
    feelec_template_id: number, 
    file_path : string,  //"static/file/ba880feb-c46b-44ab-8e0c-44aa27dd8f06.txt"
    filename : string    //"test2.txt" 
}


