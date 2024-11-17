// 웹사이트 출력 내용을 담당하는 앱 

import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@mui/material/Paper';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system'; // MUI v5 styled API 사용, 최신버전 사용한다는 뜻

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(3),
  overflowX: "auto"
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 1080,
}));

const customers = [
  
]

class App extends Component { //Component: app 를 그릴 수 있는 최소 단위
  
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callAPi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callAPi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() { //render는 return 구문을 써서 반환 
    return (
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
            {this.state.customers ? this.state.customers.map(c => { 
              return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ); 
            }) : ""}
          </TableBody>
        </StyledTable>
      </StyledPaper>
    );
  }
}

export default App;
