import React from 'react'
import Table from 'react-bootstrap/Table'
//import Button from 'react-bootstrap/Button'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Commenter URL</th>
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const rows = props.commenters.map((row, index) => {
    return (
      <tr key={index}>
        <td><a target='_blank' rel="noopener noreferrer" href={row.commenterUrl}>{row.commenterUrl}</a></td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const CommentersTable = props => {
  const { commenters } = props
  
  const showCommentersTable = props.showCommentersTable ? {display: 'block'} : {display: 'none'};
  
  return (
    <Table style={showCommentersTable}>
      <TableHeader />
      <TableBody commenters={commenters} />
    </Table>
  )
}

export default CommentersTable