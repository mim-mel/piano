import './App.css';
import * as Tone from 'tone';
import { useState } from 'react';

function App() {
  // const [keys, setKeys] = useState([]);
  const key = JSON.parse(sessionStorage.getItem('key'));
  const keys = key ? key : [];

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const piano = (e) => {
    const chord = e.target.getAttribute('chord');
    const now = Tone.now();
    synth.triggerAttack(chord, now);
  };

  const setKeys = (item) => {
    keys.push(item);
    sessionStorage.setItem('key', JSON.stringify(keys));
  };

  // 한줄에 여러함수가 있는 코드를 임시변수로 분리해보기
  //리덕스 튜토리얼 연습
  //리덕스에 문자열 리스트를 넣는 방법
  //클론 코딩 회사홈페이지 2번 => 시간체크 구체적으로 섹션별로 하기

  const release = (e) => {
    const chord = e.target.getAttribute('chord');
    const now = Tone.now();
    synth.triggerRelease([chord], now);
    setKeys(chord);
  };

  const play = (e) => {
    const now = Tone.now();
    for (let i in keys) {
      synth.triggerAttackRelease(keys[i], '8n', now + i * 1);
      console.log(i);
    }
  };

  return (
    <div className='App'>
      <div className='piano'>
        <div className='control'>
          <div
            onClick={() => {
              console.log(keys);
            }}
          >
            Check Keys
          </div>
          {
            <div>
              {keys.map((item) => (
                <span>{item}</span>
              ))}
            </div>
          }
          <div onClick={play}>play 버튼</div>
        </div>
        <div className='keys'>
          <div
            className='key'
            chord='C4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            C4
          </div>
          <div
            className='key'
            chord='D4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            D4
          </div>
          <div
            className='key'
            chord='E4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            E4
          </div>
          <div
            className='key'
            chord='F4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            F4
          </div>
          <div
            className='key'
            chord='G4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            G4
          </div>
          <div
            className='key'
            chord='A4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            A4
          </div>
          <div
            className='key'
            chord='B4'
            onMouseDown={piano}
            onMouseUp={release}
          >
            B4
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
