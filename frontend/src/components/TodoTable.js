import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import useStyles from "../styles/material-ui";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

import TableHeadBar from "./TableHeadBar";
import TableToolBar from "./TableToolBar";
import SearchBox from "./SearchBox";

import moment from "moment";

function createData(todoName, label, date, id, when, isDone) {
  return { todoName, label, date, id, when, isDone };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable(props) {
  const { userTodos, setCount, setAlert } = props;
  const [selectedTags, setSelectedTags] = useState([]);
  let rows;
  if (selectedTags.length === 0) {
    rows = userTodos.map((todo) =>
      createData(
        todo.todoName,
        todo.label,
        todo.date,
        todo.id,
        todo.date,
        todo.isDone
      )
    );
  } else {
    rows = userTodos
      .filter((todo) => selectedTags.includes(todo.label))
      .map((todo) =>
        createData(
          todo.todoName,
          todo.label,
          todo.date,
          todo.id,
          todo.date,
          todo.isDone
        )
      );
  }

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [dense2, setDense2] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showPastTodos, setShowPastTodos] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handlePastTodos = (e) => {
    setDense2(e.target.checked);
    setShowPastTodos((p) => !p);
  };

  const isSelected = (todoName) => selected.indexOf(todoName) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.todoContainer}>
      <SearchBox setSelectedTags={setSelectedTags} />
      <Box component="div" className={classes.chipContainer}>
        <div>
          <Chip
            className={classes.withinOneDay}
            style={{ marginRight: 10, marginTop: 10 }}
            label="Less than 24 hour"
          />
          <Chip
            style={{ marginRight: 10, marginTop: 10 }}
            className={classes.withinOneWeek}
            label="Within 1 Week"
          />
        </div>
        <div className={classes.mobileChips}>
          <Chip
            style={{ marginRight: 10, marginTop: 10 }}
            className={classes.moreThanOneWeek}
            label="More than 1 Week"
          />
          <Chip
            style={{ marginRight: 10, marginTop: 10 }}
            className={classes.past}
            label="Past Todos"
          />
        </div>
        <div>
          <FormControlLabel
          style={{marginTop:5}}
            control={<Switch checked={dense2} onChange={handlePastTodos} color="primary" />}
            label="Past todos"
          />
        </div>
      </Box>
      <Paper className={classes.todoPaper}>
        <TableToolBar
          numSelected={selected.length}
          selected={selected}
          setAlert={setAlert}
          setCount={setCount}
          setSelected={setSelected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <TableHeadBar
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const a = moment(row.date); // todo date
                  const b = moment(); // now
                  const diff = a.diff(b);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.todoName}
                      selected={isItemSelected}
                      className={`${
                        diff <= 0
                          ? classes.past
                          : diff < 86400000
                          ? classes.withinOneDay
                          : diff < 604800000
                          ? classes.withinOneWeek
                          : classes.moreThanOneWeek
                      } ${row.isDone && classes.done} ${
                        diff < 0 && showPastTodos && classes.hidePast
                      }`}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.todoName}
                      </TableCell>
                      <TableCell align="right">{row.label}</TableCell>
                      <TableCell align="right">
                        {moment(row.date).format("LLL")}
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.date).startOf("hour").fromNow()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
