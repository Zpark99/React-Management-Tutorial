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
        const file = e.target.files[0];
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (loadEvent) => {
            img.src = loadEvent.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 원하는 크기로 변경
                const targetWidth = 300; // 최대 넓이
                const targetHeight = 300; // 원하는 높이
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // 비율 계산
                const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;

                // 중앙 정렬을 위해 시작 위치 계산
                const x = (targetWidth / 2) - (scaledWidth / 2);
                const y = (targetHeight / 2) - (scaledHeight / 2);

                // 이미지 그리기
                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);


                // 이미지 데이터를 Base64로 변환
                const dataURL = canvas.toDataURL(file.type);
            
                // Base64를 Blob으로 변환
                fetch(dataURL)
                    .then(res => res.blob())
                    .then((blob) => {
                        const newFile = new File([blob], file.name, { type: file.type });
                        this.setState({
                            file: newFile,
                            fileName: file.name
                        });
                    });
        };
    };

    reader.readAsDataURL(file);

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
            프로필 이미지: <input type="file" name="file" onChange={this.handleFileChange}/><br />
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
// value={this.state.fileName}

export default CustomerAdd;