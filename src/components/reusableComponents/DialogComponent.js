import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
 
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

function DialogComponent(props) {
    const [dialogStatus, updateDialogStatus]= useState(props.dialogStatus?props.dialogStatus:false);
    const handleClose = () => {
        updateDialogStatus(false);        
        props.dialogClosedStatus(false);
    };
    const handleUserClick= () =>{
      props.button.clickEvent(true);
    }
    useEffect(() => {
        updateDialogStatus(props.dialogStatus);
    }, [props.dialogStatus])
    return (
        <div>
        <Dialog
          fullWidth={true}
          fullScreen={true}
          aria-labelledby="customized-dialog-title"
          open={dialogStatus}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          
        >
          <MuiDialogTitle>{props.dialogTitle?props.dialogTitle:"USER DIALOG"}</MuiDialogTitle>
          <MuiDialogContent>
          {
              props.content
          }
          </MuiDialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">CLOSE</Button>
            {
              props.button!=null?
            <Button onClick={handleUserClick} disabled={props.button.disable?true:false} color="primary">{props.button.text}</Button>
            :null
            }
          </DialogActions>
        </Dialog>
        </div>
    )
}

export default DialogComponent
