import  React from 'react';
import { Spin } from 'antd'

const LoadingPage = () => {
    
  return (
    <div className="example" style={{position: 'fixed',top: '150px', left: '0', right:'0',width: '100%',textAlign: 'center'}}>
    <Spin />
  </div>
  )
}

export default LoadingPage;