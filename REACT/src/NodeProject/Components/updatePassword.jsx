import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { login, updatePassword } from '../Api/Api';
import { useNavigate } from 'react-router';
import { setCurrentUser, setToken } from '../Redux/UserSlice';
import { useDispatch } from 'react-redux';

const UpdatePasswordComponent = ({ token, email, currentPassword }) => {
  let Dispatch = useDispatch();
  const nav = useNavigate();
  const [inputCurrentPassword, setInputCurrentPassword] = useState('');
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsCurrentPasswordCorrect(false);
    setErrorMessage('');
  };

  const handleVerifyCurrentPassword = () => {
    if (inputCurrentPassword === currentPassword) {
      setIsCurrentPasswordCorrect(true);
      setErrorMessage(''); // Clear error message if password is correct
    } else {
      setErrorMessage('הסיסמה הנוכחית אינה נכונה!');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('הסיסמאות אינן תואמות!');
      return;
    }

    updatePassword(newPassword, email, token)
      .then(data => {
        console.log("הצליח עדכון סיסמה", data);
        login(data.data.advertiser).then(data => {
          Dispatch(setCurrentUser(data.data.user));
          Dispatch(setToken(data.data.token));
          nav('/advertiser');
        }).catch(err => {
          if (err.status === 401) {
            setErrorMessage("אתה לא רשום ומועבר להרשמה");
            nav('/signIn');
          }
          console.log(err);
        });
      })
      .catch(error => {
        console.log("נכשל עדכון סיסמה", error);
      });
    handleClose();
  };

  return (
    <div>
      <Button  onClick={handleOpen}>
        עידכון סיסמה
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>אימות קוד</DialogTitle>
        <DialogContent>
          {!isCurrentPasswordCorrect ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="קוד"
                type="password"
                fullWidth
                variant="outlined"
                value={inputCurrentPassword}
                onChange={(e) => setInputCurrentPassword(e.target.value)}
                error={!!errorMessage} // Set error state
              />
              <FormHelperText error>{errorMessage}</FormHelperText>
            </>
          ) : (
            <>
              <TextField
                margin="dense"
                label="סיסמה חדשה"
                type="password"
                fullWidth
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                label="אימות סיסמה חדשה"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>
          {!isCurrentPasswordCorrect ? (
            <Button onClick={handleVerifyCurrentPassword} color="primary">
              אימות
            </Button>
          ) : (
            <Button onClick={handleUpdatePassword} color="primary">
              עדכון סיסמה
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdatePasswordComponent;
