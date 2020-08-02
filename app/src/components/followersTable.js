import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
library.add(faExclamationTriangle)

class FollowersTable extends Component {


    handleChange = (event) => {
      
          this.props.handleFollowersSelectedRowsChange(event.selectedRows);
    }
    
    
    render() {
        
        const showFollowersTable = this.props.showFollowersTable ? {display: 'block'} : {display: 'none'};

        const columns =  [
            { name: 'Profile Name', selector: 'profileName', wrap: true, sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', format: row => <a target="_blank" href={row.profileUrl}>{row.profileUrl}</a>, wrap: true, sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', wrap: true, sortable: true }
            ];
               
        return (
          
          <>
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

            <span className="below-grid-info">
            <FontAwesomeIcon className="grid-exclamation-icon" icon={faExclamationTriangle}/>
            <em>Search may take a while. Max. 1200 results.</em>
            </span>
            
            </>
        )
    }

}

export default FollowersTable;