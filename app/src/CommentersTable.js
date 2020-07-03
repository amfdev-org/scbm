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
        
        const columns =  [
            { name: 'Profile URL', selector: 'profileUrl', sortable: true },
            { name: 'Messaged Before', selector: 'messagedBefore', sortable: true }
            ];
      
          
        return (
          
          <Form>
              <DataTable style={showCommentersTable}
                columns={columns}
                data={commenterData}
                defaultSortField="messagedBefore"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
              />
                       
          </Form>
        )
    }

}

export default CommentersTable;