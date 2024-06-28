'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Component, useState } from 'react';
import axios from 'axios'

export default function Home() {
  const [firstPara, setFirstPara] = useState<string>("");
  const [secondPara, setSecondPara] = useState<string>("");
  const [freePara, setFreePara] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [solution, setSolution]  = useState<number[]>([]);

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
          <button onClick={async () => {
            // ExpressionToNumber(firstPara);
            // ExpressionToNumber(secondPara);
            // ExpressionToNumber(freePara);
            if ((firstPara === "") || (secondPara === "") || (freePara === "")) {
              alert("Nhập đủ các hệ số")  
            }
            else {
              try {
                // console.log(eval(firstPara.replace("√", "Math.sqrt")));
                // console.log(eval(secondPara.replace("√", "Math.sqrt")));
                // console.log(eval(freePara.replace("√", "Math.sqrt")));
                var first = eval(firstPara.replace("√", "Math.sqrt"));
                var second = eval(secondPara.replace("√", "Math.sqrt"));
                var free = eval(freePara.replace("√", "Math.sqrt"));
                const URL = `http://localhost:4000/?firstPara=${first}&secondPara=${second}&freePara=${free}`
                axios.get(URL)
                  .then((response) => {
                    console.log(response.data)
                    const solution = response.data
                    setSolution([solution.firstSol, solution.secondSol])
                  })
                  .catch((error: any) => {
                    console.error(error);
                  })
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
          <p>X<sub>1</sub>= {solution[0]}</p>
          <p>X<sub>2</sub>= {solution[1]}</p>
          <button>Rút gọn kết quả</button>
        </div>
      </div>
    </main>
  );
}
