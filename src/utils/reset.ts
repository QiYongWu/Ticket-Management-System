    //重置账户
   function ReSetUserCount(){
        localStorage.setItem('userName','');
        localStorage.setItem('password','');
    
    }
  
  
  //设置登录状态
  function SetLoginState(bool:boolean){
    if(bool){
      localStorage.setItem('isLogin','true')
    }
    else{
      localStorage.setItem('isLogin','');
  
      ReSetUserCount();
    }
  }

  export {ReSetUserCount,SetLoginState}