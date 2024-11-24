// 웹사이트 출력 내용을 담당하는 앱 

import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import CustomerAdd from './components/CustmoerAdd';
import Paper from '@mui/material/Paper';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system'; // MUI v5 styled API 사용, 최신버전 사용한다는 뜻
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(3),
  overflowX: "auto"
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 1080,
}));

// CircularProgressWithLabel 컴포넌트 정의

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

/*

react component lifecycle style

1) constructor ()

2) componentWillMount()

3) render ()

4) componentDidMount()

*/

/*

props or state => shouldComponentUpdate()

*/

// const customers = [] 어케 할까 이걸 

class App extends Component { //Component: app 를 그릴 수 있는 최소 단위
  
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callAPi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
  
  componentWillUnmount() {
    clearInterval(this.timer); //타이머 제거 
  }

  callAPi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() { //render는 return 구문을 써서 반환 
    return (
      <div>
      <StyledPaper>   
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell> {/* 중복 제거 */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => (
              <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />  
            )) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgressWithLabel value={this.state.completed} />           
              </TableCell>
            </TableRow> 
          )}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <CustomerAdd/>
      </div>
    );
  }
}

export default App;