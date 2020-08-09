import React from 'react'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component'
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment'

function ReceivedMessagesTable(props) {


    const handleChange = (event) => {
      
          props.handleReceivedMessagesSelectedRowsChange(event.selectedRows);
    }
    
    
        const showReceivedMessagesTable = props.showReceivedMessagesTable ? {display: 'block'} : {display: 'none'};
        const showReceivedMessagesLoadingIcon = props.showReceivedMessagesLoadingIcon ? {display: 'block'} : {display: 'none'};
        
        const columns =  [
            { name: 'Who With', selector: 'sender', sortable: true, wrap: true },
            { name: 'Date', selector: 'scMessageTime', sortable: true, wrap: true, format: row => moment(row.scMessageTime).format('LLL')},
            { name: 'Last Message', selector: 'message', sortable: true, wrap: true }
            ];
               
        return (
         
        <div id="received-messages-table-container">
        
        <Spinner style={showReceivedMessagesLoadingIcon} animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>
          
          <Form className="messagesDataTable">
              <DataTable style={showReceivedMessagesTable}
                columns={columns}
                data={props.receivedMessageData}
                defaultSortField="scMessageTime"
                defaultSortAsc={false}
                selectableRows
                onSelectedRowsChange={handleChange}
                highlightOnHover
                clearSelectedRows={props.toggledClearRows}
                pagination
                paginationPerPage={10}
              />
                       
          </Form>
          </div>
        )
    
}

export default ReceivedMessagesTable;