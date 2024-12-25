import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types'; // prop validation을 위한 PropTypes

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
            .catch(error => {
                console.error('에러가 발생했습니다!', error);
            });

        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = 'api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.birthday);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);
    }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type="file" name="file" value={this.state.fileName} onChange={this.handleFileChange}/><br />
            이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br />
            생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br />
            성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br />
            직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br />
            <button type="submit">추가하기</button>
          </form> 
        );     
    }
}

CustomerAdd.propTypes = {
    stateRefresh: PropTypes.func.isRequired,  // stateRefresh가 함수 타입으로 전달됨을 정의
  };

// file={this.state.file}

export default CustomerAdd;