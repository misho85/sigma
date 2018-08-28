import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  uploadIcon: {
    marginLeft: theme.spacing.unit
  }
});

/* list of supported file types */
const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm'
]
  .map(x => `.${x}`)
  .join(',');

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends Component {
  handleChange = e => {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  };
  render() {
    const { classes } = this.props;
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            accept={SheetJSFT}
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={this.handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              color="primary"
            >
              Upload
              <CloudUploadIcon className={classes.uploadIcon} />
            </Button>
          </label>
        </div>
      </form>
    );
  }
}

DataInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataInput);
