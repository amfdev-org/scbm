import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import Spinner from 'react-bootstrap/Spinner'

function MyFollowersTable(props) {

      const context = useContext(ContextConsumer);
            
    const handleChange = (event) => {
      
          props.handleMyFollowersSelectedRowsChange(event.selectedRows, context);
    }

    
        const showMyFollowersTable = props.showMyFollowersTable ? {display: 'block'} : {display: 'none'};
        const showMyFollowersLoadingIcon = props.showMyFollowersLoadingIcon ? {display: 'block'} : {display: 'none'};
        
        const columns =  [
            { name: 'Profile Name', selector: 'profileName', wrap: true, sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', wrap: true, format: row => <a target="_blank" rel="noopener noreferrer" href={row.profileUrl}>{row.profileUrl}</a>, sortable: true, hide: "sm" },
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
                data={props.myFollowerData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={handleChange}
                highlightOnHover
                clearSelectedRows={props.toggledMyFollowersClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          
      </div>
        )
    
}

export default MyFollowersTable;