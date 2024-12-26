import React from "react";
import { TableRow, TableCell } from '@mui/material';
import PropTypes from 'prop-types'; // 유효성 검사 
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component {
  render() {

    return ( //코드 반환을 위해 return 추가, props 저건 지금은 문제 없긴함 
        <TableRow>
          <TableCell>{this.props.id}</TableCell>
          <TableCell>
          {/* 이미지가 동적으로 출력되도록 img 태그 사용 */}
          <img 
            src={this.props.image} 
            alt="profile" 
            width={this.props.imageWidth} // 이미지 너비 설정
          />
          </TableCell>
          <TableCell>{this.props.name}</TableCell>
          <TableCell>{this.props.birthday}</TableCell>
          <TableCell>{this.props.gender}</TableCell>
          <TableCell>{this.props.job}</TableCell>
          <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
        </TableRow>
    );
  }
}

Customer.propTypes = {
  id: PropTypes.number.isRequired, //id, imageWidth는 숫자 관련이므로 number, 나머지는 문자 정보이므로 string 
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired, 
  stateRefresh: PropTypes.func.isRequired, 
  imageWidth: PropTypes.number.isRequired
};

export default Customer;