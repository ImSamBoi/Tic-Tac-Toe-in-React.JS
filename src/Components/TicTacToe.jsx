import React, { useRef, useState } from 'react';
import circle from '../Assets/circle.png';
import cross from '../Assets/cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

const TicTacToe = () => {

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const boxRefs = useRef(Array(9).fill().map(() => React.createRef()));

  const toggle = (e, num) => {
    if (lock) return;

    if (data[num] !== '') return;

    if (count % 2 === 0) {
      boxRefs.current[num].current.innerHTML = `<img class='m-12' src=${cross}>`;
      data[num] = 'x';
    } else {
      boxRefs.current[num].current.innerHTML = `<img class='m-12' src=${circle}>`;
      data[num] = 'o';
    }

    setCount(++count);
    checkWin(num);
  };

  const checkWin = (num) => {
    const won = (winner) => {
      setLock(true);
      if (winner === 'x') {
        titleRef.current.innerHTML = `Congratulations: <img class='mx-2 mt-2 h-8' src=${cross}> Wins`;
      } else if (winner === 'o') {
        titleRef.current.innerHTML = `Congratulations: <img class='mx-2 mt-2 h-8' src=${circle}> Wins`;
      } else {
        titleRef.current.innerHTML = `It's a draw`;
      }
    };

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[num]);
        return;
      }
    }

    if (!data.includes('')) {
      won(0);
    }
  };

  const reset = () => {
    setLock(false);
    data = ['', '', '', '', '', '', '', '', ''];
    titleRef.current.innerHTML = "Tic Tac Toe in <span class='text-[#26ffcb] pl-3'>React</span>";
    
    boxRefs.current.forEach((ref) => {
      ref.current.innerHTML = '';
    });

    setCount(0);
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-[#0f1b21] font-bold p-12'>
      <h1 className='flex flex-row items-center content-center text-white text-center text-5xl' ref={titleRef}>
        Tic Tac Toe in <span className='text-[#26ffcb] pl-3'>React</span>
      </h1>
      <div className='flex m-auto'>

        <div>
          <div ref={boxRefs.current[0]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 0) }}></div>
          <div ref={boxRefs.current[1]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 1) }}></div>
          <div ref={boxRefs.current[2]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 2) }}></div>
        </div>

        <div>
          <div ref={boxRefs.current[3]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 3) }}></div>
          <div ref={boxRefs.current[4]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 4) }}></div>
          <div ref={boxRefs.current[5]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 5) }}></div>
        </div>

        <div>
          <div ref={boxRefs.current[6]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 6) }}></div>
          <div ref={boxRefs.current[7]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 7) }}></div>
          <div ref={boxRefs.current[8]} className='flex h-44 w-44 bg-[#1f3540] border-4 border-[#0f1b21] rounded-xl cursor-pointer' onClick={(e) => { toggle(e, 8) }}></div>
        </div>

      </div>
      <button className='w-64 h-24 border-0 outline-0 cursor-pointer rounded-[50px] bg-[#1f3540] font-[26px] text-[#26ffcb]' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
