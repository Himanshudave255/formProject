import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650
  },
  column:{
    textAlign:"right"
  },
  no:{
  }
}));
function TableComponent(props) {
  const [size, updateSize] = useState(props.size?props.size:"medium");
  const [userow, updateRow] = useState(props.rows);
  const columnValue=props.column;
  const classes = useStyles();
  
  useEffect(() => {
    if(Object.keys(props.addData).length!=0){
      const newArr = [...userow,props.addData];
      updateRow(newArr);
    }
    else{ 
      updateRow(props.rows);
    }
  },[props.rows,props.addData]);

    return (
    <div>
      <Table size={size} className={classes.table}> 
        <TableHead>
          <TableRow>
            {
              props.column.map((column,index)=>(
                <TableCell key={column} className={index!=0?classes.column:classes.no}>{column}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userow.map((row,index) => (
            <TableRow key={row.name}>
              {
                Object.keys(row).map((row1,index1)=>(
                  <TableCell key={row.name+index1} className={index1!=0?classes.column:classes.no}>{row[columnValue[index1]]}</TableCell>
                ))
              }
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </div>
    )
}

export default TableComponent
