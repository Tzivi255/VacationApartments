import React, { useState } from 'react';
import UpdatePasswordComponent from './updatePassword'; // החלף עם הנתיב הנכון
import { resetPassword } from '../Api/Api';
import { Button } from '@mui/material';

export const SendEmailPass = (props) => {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [token, setToken] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  // const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const data = await resetPassword(props.email);
      console.log("שליחת מייל הצליח", data);
      setToken(data.data.token);
      setTempPassword(data.data.tempPassword);
      // setEmail(data.data.advertiserEmail);
      setShowUpdatePassword(true);
    } catch (err) {
      console.log("נכשל שליחת מייל", err);
    }
  };

  return <>  
    <div>
      <Button variant="text" onClick={handleResetPassword}>שכחתי סיסמה</Button>
      {showUpdatePassword && (
        <UpdatePasswordComponent token={token} currentPassword={tempPassword} email={props.email} />
      )}
    </div>
    </>
};

export default SendEmailPass;