import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'

class CommentersTable extends Component {


    handleChange = changeEvent => {
      
          this.props.handleCommentersChange(changeEvent.selectedRows);
    }
    
    
    render() {
        
        const commenterData = this.props.commenterData
  
        const showCommentersTable = this.props.showCommentersTable ? {display: 'block'} : {display: 'none'};
        
        const toggledClearRows = this.props.toggledClearRows;
        
        const columns =  [
            { name: 'Profile URL', selector: 'profileUrl', sortable: true },
            { name: 'Messaged', selector: 'messaged', sortable: true }
            ];
      
          
        return (
          
          <Form>
              <DataTable style={showCommentersTable}
                columns={columns}
                data={commenterData}
                defaultSortField="profileUrl"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={toggledClearRows}
              />
                       
          </Form>
        )
    }

}

export default CommentersTable;