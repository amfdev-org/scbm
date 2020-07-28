import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import Spinner from 'react-bootstrap/Spinner'

class MyFollowersTable extends Component {


    handleChange = (event) => {
      
          this.props.handleMyFollowersSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const showMyFollowersTable = this.props.showMyFollowersTable ? {display: 'block'} : {display: 'none'};
        const showMyFollowersLoadingIcon = this.props.showMyFollowersLoadingIcon ? {display: 'block'} : {display: 'none'};
        
        const columns =  [
            { name: 'Profile Name', selector: 'profileName', wrap: true, sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', wrap: true, sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', wrap: true, sortable: true }
            ];
      
          
      return (
          
      <div id="my-followers-table-container">
      
      <Spinner style={showMyFollowersLoadingIcon} animation="border" role="status">
      <span className="sr-only">Loading...</span>
      </Spinner>
                  
          <Form className="myFollowersDataTable">
              <DataTable style={showMyFollowersTable}
                columns={columns}
                data={this.props.myFollowerData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={this.handleChange}
                highlightOnHover
                clearSelectedRows={this.props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          
      </div>
        )
    }

}

export default MyFollowersTable;