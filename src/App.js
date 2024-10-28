// 웹사이트 출력 내용을 담당하는 앱 

import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/1',
    'name': '박진재',
    'birthday': '960530',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': '김영기',
    'birthday': '950530',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/3',
    'name': '박민',
    'birthday': '940530',
    'gender': '남자',
    'job': '대학생'
  },
]

class App extends Component { //Component: app 를 그릴 수 있는 최소 단위
  render() { //render는 return 구문을 써서 반환 
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer 
                key={c.id} // 원래이거 넣어줘야함 
                id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}              
              /> ); }) }
      </div>
    );
  }
}

export default App;
