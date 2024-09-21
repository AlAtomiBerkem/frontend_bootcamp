import React from 'react'

import './styles/App.css';
import StudentInfo from './components/StudentInfo.jsx';
import Header from './components/Header.jsx';
import Timer from './components/Timer.jsx'

function App() {

  const [timer, setTimer] = React.useState(false);
  const [studInfo, setStudInfo] = React.useState(false);

  const clickTimer = () => {
    setTimer(true)
    setStudInfo(false)
  }

  const clickStudentInfo = () => {
    setStudInfo(true)
    setTimer(false)
  }

  return (
    <div className="App">
      <Header  timer={clickTimer} studInfo={clickStudentInfo} />
      {studInfo && <StudentInfo />}
      {timer && <Timer />}
    </div>
  );
}

export default App;
