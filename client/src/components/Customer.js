import React from "react";
import { TableRow, TableCell } from '@mui/material';
import PropTypes from 'prop-types'; // 유효성 검사 

class Customer extends React.Component {
  render() {
    return ( //코드 반환을 위해 return 추가, props 저건 지금은 문제 없긴함 
        <TableRow>
          <TableCell>{this.props.id}</TableCell>
          <TableCell><img src={this.props.image} alt="profile"/> </TableCell>
          <TableCell>{this.props.name}</TableCell>
          <TableCell>{this.props.birthday}</TableCell>
          <TableCell>{this.props.gender}</TableCell>
          <TableCell>{this.props.job}</TableCell>
        </TableRow>
    );
  }
}

// class CustomerProfile extends React.Component {
//   render() {
//     return (
//       <div>
//         <img src={this.props.image} alt="profile" style={{ width: '64px', height: '64px' }}/>
//         <h2>{this.props.name}({this.props.id})</h2>
//       </div>
//     )
//   }
// }

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
};

export default Customer;