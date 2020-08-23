import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
library.add(faExclamationTriangle)

function FollowersTable(props) {

    const context = useContext(ContextConsumer);

    const handleChange = (event) => {
      
          props.handleFollowersSelectedRowsChange(event.selectedRows, context);
    }
    
      const handleRecentSearchClick = (searchUrl) => {

      props.handleFollowersRecentSearchSubmit(searchUrl, context);
    }

        const showFollowersTable = props.showFollowersTable ? {display: 'block'} : {display: 'none'};
        const showFollowersRecentSearchContainer = props.showFollowersRecentSearchContainer ? {display: 'block'} : {display: 'none'};

        const columns =  [
            { name: 'Profile Name', selector: 'profileName', wrap: true, sortable: true },
            { name: 'Profile URL', selector: 'profileUrl', format: row => <a target="_blank" rel="noopener noreferrer" href={row.profileUrl}>{row.profileUrl}</a>, wrap: true, sortable: true, hide: "sm" },
            { name: 'Messaged', selector: 'messaged', wrap: true, sortable: true }
            ];
               
        return (
          
          <>
          
      <div className="recent-search-container" style={showFollowersRecentSearchContainer}>
          <h6>Recent Searches</h6>  
            {props.recentFollowersSearches.map((item, key) => {
                  return (
                        <Badge
                              key={key}
                              onClick={() => props.enableFollowersRecentSearchBadges && handleRecentSearchClick(item.search) }
                              className={`${props.enableFollowersRecentSearchBadges ? "recent-search-badge" : "recent-search-badge disabled-badge"}`}
                              variant="primary">
                              {item.search}
                        </Badge>
                   )
            })}
            </div>
            
          <Form className="followersDataTable">
              <DataTable style={showFollowersTable}
                columns={columns}
                data={props.followerData}
                defaultSortField="profileName"
                selectableRows
                onSelectedRowsChange={handleChange}
                highlightOnHover
                clearSelectedRows={props.toggledFollowersClearRows}
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

export default FollowersTable;