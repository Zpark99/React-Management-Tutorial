import React from "react";
import axios from 'axios';
import { Dialog, DialogTitle, Button, DialogContent, TextField, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types'; // PropTypes 추가

// 스타일 정의
const HiddenInput = styled('input')({
    display: 'none'
});

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
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
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config);
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
    
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <HiddenInput accept="image/*" id="raised-button-file" type="file" onChange={this.handleFileChange}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br />
                    <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br />
                    <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br />
                    <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>      
        );     
    }
}

// PropTypes 정의
CustomerAdd.propTypes = {
    stateRefresh: PropTypes.func.isRequired
};

export default CustomerAdd;

//모르겠음 