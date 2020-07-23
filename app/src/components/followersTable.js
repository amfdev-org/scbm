import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'

class FollowersTable extends Component {


    handleChange = (event) => {
      
          this.props.handleFollowersSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const showFollowersTable = this.props.showFollowersTable ? {display: 'block'} : {display: 'none'};

        const columns =  [
            { name: 'Profile Name', selector: 'profileName', sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', sortable: true }
            ];
               
        return (
          
          <Form className="followersDataTable">
              <DataTable style={showFollowersTable}
                columns={columns}
                data={this.props.followerData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={this.props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
        )
    }

}

export default FollowersTable;