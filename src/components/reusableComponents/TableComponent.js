import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { setTimeout } from 'timers';
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
  const [userow, updateRow] = useState(props.rows.map(res=>res.checked=false));
  const [order, updateOrder]=useState("asc");
  const columnValue=props.column;
  const columnValueLength=columnValue.length;
  const classes = useStyles();
  const [deleteItemIndex,updateDeleteItemIndex]=useState([]);
  const [checkAllRows,updateCheckAllRows]=useState(false);

  function onRowSelect(id){
    let arr=[];
    let deletedArr=[];
    arr=userow.map(val=>{
      if(val.id===id){
        val.checked?
        val={...val,checked:false}
        :
        val={...val,checked:true}
      }
      return val
    });
    deletedArr=arr.filter(res=>{return res.checked});
    updateDeleteItemIndex(deletedArr);
    props.setDeleteItem(deletedArr);
    updateRow(arr);
  }

  function onColumCheckBoxSelect(){
    let rowArray=[];
    if(checkAllRows){
      updateCheckAllRows(false);
      rowArray=userow.map(val=>{
          val={...val,checked:false}
          return val
    });
    props.setDeleteItem([]);
    }else{
      updateCheckAllRows(true);
      rowArray=userow.map(val=>{
          val={...val,checked:true}
          return val
    });
    props.setDeleteItem(rowArray);
    }
    updateRow(rowArray);
  }

  useEffect(() => {
      updateRow(props.rows);
  },[props.rows]);

  const createSortHandler = property => event => {
      userow.sort(function(a=0, b){
      var nameA=typeof(a[property])==="number" ? a[property]: a[property].toLowerCase(), nameB=typeof(b[property])==="number" ? b[property]: b[property].toLowerCase()
      if (nameA < nameB)
          return -1 
      if (nameA > nameB)
          return 1
      return 0; 
      });
      if(order==="desc"){
      userow.reverse();
  }
  
  updateOrder(order==="asc"?"desc":"asc");
  updateRow(userow);
  };
    return (      
    <div>
      <Table size={size} className={classes.table}> 
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
            <Checkbox
             indeterminate={deleteItemIndex.length?true:false}
             inputProps={{ 'aria-labelledby': 1 }}
             onChange={onColumCheckBoxSelect}
             />
            </TableCell>
            {
              props.column.map((column,index)=>(
                <TableCell key={column} className={classes.column}><TableSortLabel
                direction={order}
                onClick={createSortHandler(column)}
              >
                {column}
              </TableSortLabel></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { 
            userow.map((row,index) => (
            <TableRow key={row.id?row.id:columnValueLength+1}>
            <TableCell padding="checkbox">
             <Checkbox
             checked={row.checked?row.checked:false}
             inputProps={{ 'aria-labelledby': 1 }}
             onChange={onRowSelect.bind(this,row.id)}
             />
             </TableCell>
              {
                Object.keys(row).map((row1,index1)=>(
                  index1<columnValueLength?
                  <TableCell key={(row.id?row.id:columnValueLength+1)+index1} className={classes.column}>{row[columnValue[index1]]}</TableCell>
                  :null
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

