import React from "react";
import PropTypes from 'prop-types'; 
import { Dialog, DialogTitle, Button, DialogContent, DialogActions, Typography } from '@mui/material';


class CustomerDelete extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        open: false
      }
  }

  handleClickOpen = () => {
    this.setState({
        open: true
      });
  }

  handleClose = () => { //binding처리?
    this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
      });
  }
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
          <div>
          <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle onClose={this.handleClose}>
                      삭제 경고
              </DialogTitle>
              <DialogContent>
                  <Typography gutterBottom>
                      선택한 고객 정보가 삭제 됩니다.
                  </Typography>
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" color="primary" onClick={(e)=> {this.deleteCustomer(this.props.id)}}>삭제</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
          </Dialog>
          </div>
        )
    }
}

CustomerDelete.propTypes = {
  id: PropTypes.number.isRequired, // id prop 검증 추가
  stateRefresh: PropTypes.func.isRequired // stateRefresh prop 검증 추가
};


export default CustomerDelete;