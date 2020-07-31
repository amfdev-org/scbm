import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'

class CommentersTable extends Component {


    handleChange = (event) => {
      
          this.props.handleCommentersSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const showCommentersTable = this.props.showCommentersTable ? {display: 'block'} : {display: 'none'};
        
        const columns =  [
            { name: 'Profile Name', selector: 'profileName', wrap: true, sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', wrap: true, sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', wrap: true, sortable: true }
            ];
               
        return (
          
          <>
          <Form className="commentersDataTable">
              <DataTable style={showCommentersTable}
                columns={columns}
                data={this.props.commenterData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={this.props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          
          <span className="below-grid-info"><em>Search may take a while and a limit of 1200 commmenters will be shown.</em></span>
            </>
        )
    }

}

export default CommentersTable;