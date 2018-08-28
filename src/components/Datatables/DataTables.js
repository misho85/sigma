import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';

class DataTables extends Component {
  render() {
    const columns = [
      {
        name: 'Id',
        options: {
          filter: false
        }
      },
      {
        name: 'Ime i Prezime',
        options: {
          filter: false
        }
      },
      {
        name: 'Plata',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat('sr-Latn-CS', {
              style: 'currency',
              currency: 'RSD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
      {
        name: 'Br. Dnevnih',
        options: {
          filter: true
        }
      },
      {
        name: 'Br. Nocnih',
        options: {
          filter: true
        }
      }
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      selectableRows: false
    };

    const { data } = this.props;

    return (
      <MUIDataTable
        title={'Gate Operators'}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default DataTables;
