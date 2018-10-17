import React from "react";
import { inject, observer } from "mobx-react";
import { flowRight as compose } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import AddWhDialog from "./AddWhDialog.jsx";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const EditWhDialog = ({
  appStore,
  guiStore,
  handleClose,
  handleStart,
  classes,
  ...props
}) => {
  const { wormholes } = appStore;
  const { addWhDialog } = guiStore;
  return (
    <Dialog {...props}>
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Wormholes
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={16}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mass</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wormholes.map(wh => (
                <TableRow key={wh.id}>
                  <TableCell>{wh.name}</TableCell>
                  <TableCell>{wh.startMass}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AddWhDialog
            open={addWhDialog}
            close={() => guiStore.closeAddWhDialog()}
          />
          <Button
            variant="fab"
            color="secondary"
            className={classes.fab}
            onClick={() => guiStore.openAddWhDialog()}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default compose(
  withStyles(styles),
  inject("appStore", "guiStore"),
  observer
)(EditWhDialog);
