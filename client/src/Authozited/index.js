import { notification } from "antd";
import React from "react";
import { Route , Redirect} from "react-router-dom";

const Authorzited = ({component: Component, ...rest}) => {
    const Auth = localStorage.getItem('auth');
    const notify = () =>{
      notification.error({message: 'Bạn chưa đăng nhập'});
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    }
    return (
        
        <Route
          {...rest}
          render={props =>
            Auth ? (
              <Component {...props} />
            ) : (
              notify()
            )
          }
        />
     
          
    )
    
}

export default Authorzited;