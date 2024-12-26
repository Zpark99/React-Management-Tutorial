import React from "react";
import PropTypes from 'prop-types'; 

class CustomerDelete extends React.Component {

  deleteCustomer(id) {
      const url = '/api/customers/' + id;
      fetch(url, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          this.props.stateRefresh();
        } else {
          console.error('삭제 실패');
        }
      })
      .catch(error => console.error('Error:', error)); // 오류 처리 추가
  }

    render() {
        return (
          <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

CustomerDelete.propTypes = {
  id: PropTypes.number.isRequired, // id prop 검증 추가
  stateRefresh: PropTypes.func.isRequired // stateRefresh prop 검증 추가
};


export default CustomerDelete;