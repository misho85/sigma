import React, { Component } from 'react';
import XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DragDropFile from './DragDropFile';
import Datatables from './DataTables';
import DataInput from './DataInput';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
class SheetJSApp extends Component {
  state = {
    // data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    plate: []
  };

  handleFile = file => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[1]; // drugi worksheet
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });
      /* Update state */
      // this.setState({ data });
      // console.log(data);
      /* Kalkulator plate */
      const filterData = i => {
        if (!isNaN(i[0]) && i.length > 30) {
          return true;
        }
      };

      const smena = {
        '4-13': [7, 2],
        '4-14': [8, 2],
        '5-14': [8, 1],
        '6-14': [8, 0],
        '6-18': [12, 0],
        '7-19': [12, 0],
        '11-19': [8, 0],
        '12-19': [7, 0],
        '12-20': [8, 0],
        '12-21': [9, 0],
        '12-22*': [10, 0],
        '16-01': [6, 3],
        '19-7': [4, 0],
        '22-7': [1, 8]
      };

      const smenaKeys = Object.keys(smena);
      const smenaValues = Object.values(smena);

      const cenaDnevniSat = 284.09;
      const cenaNocniSat = cenaDnevniSat + (26 / 100) * cenaDnevniSat;
      const cenaPraznikSat = cenaDnevniSat + (110 / 100) * cenaDnevniSat;

      const plate = data.filter(filterData).map(r => {
        // console.log(r);
        let brojDnevihSati = 0;
        let brojNocnihSati = 0;
        const brojPraznikSati = 0;
        r.forEach(e => {
          for (let i = 0; i < smenaKeys.length; i++) {
            if (e === smenaKeys[i]) {
              brojDnevihSati += smenaValues[i][0];
              brojNocnihSati += smenaValues[i][1];
            }
          }
        });
        const plata = Math.round(
          brojDnevihSati * cenaDnevniSat +
            brojNocnihSati * cenaNocniSat +
            brojPraznikSati * cenaPraznikSat
        );
        // return r.push(plata);
        return [r[0], r[1], plata, brojDnevihSati, brojNocnihSati];
      });
      this.setState({ plate });
      // console.log(plate);
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  render() {
    const { classes } = this.props;
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <DataInput handleFile={this.handleFile} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Datatables data={this.state.plate} />
            </Grid>
          </Grid>
        </div>
      </DragDropFile>
    );
  }
}

SheetJSApp.propTypes = {
  classes: PropTypes.object.isRequired
};

// if (typeof module !== "undefined") module.exports = SheetJSApp;
export default withStyles(styles)(SheetJSApp);
