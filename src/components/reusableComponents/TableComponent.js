import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
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

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function TableComponent(props) {
  const [size, updateSize] = useState(props.size?props.size:"medium");
  const [userow, updateRow] = useState(props.rows.map(res=>res.checked=false));
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
    if(Object.keys(props.addData).length!=0){
      if(typeof(props.addData.id)==="string"){
        props.addData.id=JSON.parse(props.addData.id);
      }
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
            <TableCell padding="checkbox">
            <Checkbox
             indeterminate={deleteItemIndex.length?true:false}
             inputProps={{ 'aria-labelledby': 1 }}
             onChange={onColumCheckBoxSelect}
             />
            </TableCell>
            {
              props.column.map((column,index)=>(
                <TableCell key={column} className={classes.column}>{column}</TableCell>
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
             checked={row.checked}
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
