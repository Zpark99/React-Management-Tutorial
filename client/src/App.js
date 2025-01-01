// 웹사이트 출력 내용을 담당하는 앱 

import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import CustomerAdd from './components/CustmoerAdd';
import Paper from '@mui/material/Paper';
import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { styled, alpha } from '@mui/material/styles'; // MUI v5 styled API 사용, 최신버전 사용한다는 뜻
import PropTypes from 'prop-types'; // props type 추가 
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

class App extends Component { //Component: app 를 그릴 수 있는 최소 단위, class는 한 앱당 하나 
  
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      imageWidth: 100 // 이미지 너비 설정
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callAPi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
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
  const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"]
    return (
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div className='menu'>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      </Box>
      <StyledPaper>   
        <StyledTable>
          <TableHead>
            <TableRow>
              {cellList.map((c, index) => (
                <TableCell key={c} style={{ fontSize: '1.5rem'}}>
                  {c}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? 
              this.state.customers.map(c => (
              <Customer 
                stateRefresh={this.stateRefresh}
                key={c.id} /* 고객 고유 id를 key로 사용 */
                id={c.id} 
                image={c.image} 
                name={c.name} 
                birthday={c.birthday} 
                gender={c.gender} 
                job={c.job} 
                imageWidth={this.state.imageWidth} //동적인 이미지 전달
              />  
            )
          ) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgressWithLabel value={this.state.completed} />           
              </TableCell>
            </TableRow> 
          )}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  </div>
);
}
}

export default App;