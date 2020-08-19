import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
library.add(faExclamationTriangle)


function SentMessagesTable(props) {

      const context = useContext(ContextConsumer);
      
      const handleChange = (event) => {
      
          props.handleSentMessagesSelectedRowsChange(event.selectedRows, context);
      }
    
        
      const showSentMessagesTable = props.showSentMessagesTable ? {display: 'block'} : {display: 'none'};

      const  messageCaveat = props.isTestMode ? "Only test sends made via SCBM will be shown." : "Only real messages sent via SCBM will be shown.";
      
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
            <em>{messageCaveat}</em>
            </span>
            </>
        )

}

export default SentMessagesTable;