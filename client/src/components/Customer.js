import React from "react";
import { TableRow, TableCell } from '@mui/material';
import PropTypes from 'prop-types'; // 유효성 검사 

class Customer extends React.Component {
  render() {
    // props에서 필요한 값들 추출 (destructuring)
    const { image, name, imageWidth } = this.props;

    return ( //코드 반환을 위해 return 추가, props 저건 지금은 문제 없긴함 
        <TableRow>
          <TableCell>{this.props.id}</TableCell>
          <TableCell>
          {/* 이미지의 크기를 동적으로 설정 */}
          <img
            src={image}
            alt={name}
            style={{ width: `${imageWidth}px`, height: 'auto' }} // 이미지 크기 동적 설정
          />
          </TableCell>
          <TableCell>{this.props.name}</TableCell>
          <TableCell>{this.props.birthday}</TableCell>
          <TableCell>{this.props.gender}</TableCell>
          <TableCell>{this.props.job}</TableCell>
        </TableRow>
    );
  }
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired, // imageWidth가 반드시 숫자여야 함을 명시
};

export default Customer;