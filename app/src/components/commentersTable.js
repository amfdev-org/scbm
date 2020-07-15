import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'

class CommentersTable extends Component {


    handleChange = (event) => {
      
          this.props.handleCommentersSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const commenterData = this.props.commenterData
  
        const showCommentersTable = this.props.showCommentersTable ? {display: 'block'} : {display: 'none'};
        
        const toggledClearRows = this.props.toggledClearRows;
        
        const columns =  [
            { name: 'Profile Name', selector: 'profileName', sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', sortable: true }
            ];
      
          
        return (
          
          <Form className="commentersDataTable">
              <DataTable style={showCommentersTable}
                columns={columns}
                data={commenterData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
        )
    }

}

export default CommentersTable;