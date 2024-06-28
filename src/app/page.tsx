'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Component, useState } from 'react';

export default function Home() {
  const [firstPara, setFirstPara] = useState<string>("");
  const [secondPara, setSecondPara] = useState<string>("");
  const [freePara, setFreePara] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  type CalButtonProps = {
    value: string
  }

  function CalButton({value}: CalButtonProps) {
    function OnClickNumButton() {
      switch (currentFocus) {
        case 1:
          value != "√"? setFirstPara(firstPara.concat(value)): setFirstPara(firstPara.concat("√("));
          break;
        case 2:
          value != "√"? setSecondPara(secondPara.concat(value)): setSecondPara(secondPara.concat("√("));
          break;
        case 3:
          value != "√"? setFreePara(freePara.concat(value)): setFreePara(freePara.concat("√("));
          break;
        default: 
      }
    }
    return (
      <button onClick={OnClickNumButton}>{value}</button>
    )
  }

  return (
    <main>
      <h1>Giải phương trình bậc 2 online</h1>

      <ul>
        <li><CalButton value={'1'}></CalButton></li>
        <li><CalButton value={'2'}></CalButton></li>
        <li><CalButton value={'3'}></CalButton></li>
        <li><CalButton value={'4'}></CalButton></li>
        <li><CalButton value={'5'}></CalButton></li>
        <li><CalButton value={'6'}></CalButton></li>
        <li><CalButton value={'7'}></CalButton></li>
        <li><CalButton value={'8'}></CalButton></li>
        <li><CalButton value={'9'}></CalButton></li>
        <li><CalButton value={'0'}></CalButton></li>
      </ul>

      <ul>
        <li><CalButton value="+"></CalButton></li>
        <li><CalButton value="-"></CalButton></li>
        <li><CalButton value="*"></CalButton></li>
        <li><CalButton value="/"></CalButton></li>
        <li><CalButton value="√"></CalButton></li>
        <li><CalButton value="("></CalButton></li>
        <li><CalButton value=")"></CalButton></li>
        <li><CalButton value="."></CalButton></li>
      </ul>

      <div>
        <div>
          <h3>Nhập các hệ số</h3>
          <p><input value={firstPara} onFocus={() => {setCurrentFocus(1)}} onChange={(e) => {setFirstPara(e.target.value)}}></input>X<sup>2</sup> 
          + <input value={secondPara} onFocus={() => {setCurrentFocus(2)}} onChange={(e) => {setSecondPara(e.target.value)}}></input>X 
          + <input value={freePara} onFocus={() => {setCurrentFocus(3)}} onChange={(e) => {setFreePara(e.target.value)}}></input> = 0</p>
          <button onClick={() => {
            // ExpressionToNumber(firstPara);
            // ExpressionToNumber(secondPara);
            // ExpressionToNumber(freePara);
            if ((firstPara === "") || (secondPara === "") || (freePara === "")) {
              alert("Nhập đủ các hệ số")  
            }
            else {
              try {
                console.log(eval(firstPara.replace("√", "Math.sqrt")));
                console.log(eval(secondPara.replace("√", "Math.sqrt")));
                console.log(eval(freePara.replace("√", "Math.sqrt")));
              }
              catch(e) {
                alert("Nhập không đúng định dạng")
              }
            }
          }}>Tính nghiệm</button>
          <button onClick={() => {
            setFirstPara("");
            setSecondPara("");
            setFreePara("");
            setCurrentFocus(0);
          }}>Làm mới</button>
        </div>
        <div>
          <p>X<sub>1</sub>=</p>
          <p>X<sub>2</sub>=</p>
          <button>Rút gọn kết quả</button>
        </div>
      </div>
    </main>
  );
}
