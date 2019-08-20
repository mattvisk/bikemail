import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { connect } from 'react-redux'
import {
  create_recipient
} from '../../../../modules/recipient'

const getRowId = row => row.id;

const RecipientList = props => {
  const [columns] = useState([
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'phone', title: 'Phone' },
    { name: 'unsubscribed', title: 'Unsubscribed' },
  ]);
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'id', width: 60 },
  ]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});

  const changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { }));
    setAddedRows(initialized);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      console.log(added[0])
      props.addRecipient(added[0], props.username)
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
};

const mapStateToProps = ({ user }) => ({
  username: user.username,

})


const mapDispatchToProps = dispatch => {
  return {
    addRecipient : (recipient, user) => create_recipient(recipient, user, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientList)