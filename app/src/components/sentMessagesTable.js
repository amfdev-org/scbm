import React from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
library.add(faExclamationTriangle)


function SentMessagesTable(props) {


    const handleChange = (event) => {
      
          props.handleSentMessagesSelectedRowsChange(event.selectedRows);
    }
    
        
        const showSentMessagesTable = props.showSentMessagesTable ? {display: 'block'} : {display: 'none'};

        const columns =  [
            { name: 'Recipient', selector: 'recipient', sortable: true, wrap: true },
            { name: 'Date', selector: 'createdAt', sortable: true, wrap: true, format: row => moment(row.createdAt).format('LLL')},
            { name: 'Message', selector: 'message', sortable: true, wrap: true }
            ];
               
        return (
          
          <>
          <Form className="messagesDataTable">
              <DataTable style={showSentMessagesTable}
                columns={columns}
                data={props.sentMessageData}
                defaultSortField="createdAt"
                 defaultSortAsc={false}
                selectableRows
                onSelectedRowsChange={handleChange}
                highlightOnHover
                clearSelectedRows={props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          
            <span className="below-grid-info">  <FontAwesomeIcon className="grid-exclamation-icon" icon={faExclamationTriangle}/>
            <em>Only messages sent via SCBM will be shown.</em>
            </span>
            </>
        )

}

export default SentMessagesTable;