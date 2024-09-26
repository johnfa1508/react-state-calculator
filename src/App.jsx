/* eslint-disable react/prop-types */
import { useState } from "react"
import "./App.css"

function RenderNumbers({ handleChange }) {
  let content = [];

  for (let i = 1; i <= 11; i++) {
    if (i === 10) {
      content.push(<button key={i} onClick={() => handleChange(0)}>0</button>);
    } else if (i === 11) {
      content.push(<button key={i} onClick={() => handleChange(undefined)}>Clear</button>)
    } else {
      content.push(<button key={i} onClick={() => handleChange(i)}>{i}</button>);
    }
  }

  return (
    <>
      <div className="numbers">
        {content}
      </div>
    </>
  )
}

function App() {
  const [total, setTotal] = useState(0)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [operator, setOperator] = useState('+')

  const calculate =  () => {
    const num1 = parseInt(firstNumber)
    const num2 = parseInt(secondNumber)

    if (operator === '+') setTotal(num1 + num2)
    else if (operator === '-') setTotal(num1 - num2)
    else if (operator === '*') setTotal(num1 * num2)
    else setTotal(num1 / num2)
  }

  const handleNumberChange = (num, state) => {
    if (num === undefined) {
      state('')
    } else {
      state((prev) => prev === "0" || prev === "" ? num.toString() : prev + num.toString())
    }
  }

  const handleOperator = (operator) => {
    setOperator(operator)
  }

  return (
    <div className="calculator">
      {/* First number */}
      <div className="panel">
        <p>{firstNumber === '' ? '0' : firstNumber}</p>
        <RenderNumbers handleChange={(num) => handleNumberChange(num, setFirstNumber)} />
      </div>

      {/* Choose operator */}
      <div className="panel">
        <p>{operator}</p>
        <div className="numbers">
          <button onClick={() => handleOperator('+')}>+</button>
          <button onClick={() => handleOperator('-')}>-</button>
          <button onClick={() => handleOperator('*')}>*</button>
          <button onClick={() => handleOperator('/')}>÷</button>
        </div>
      </div>

      {/* Second number */}
      <div className="panel">
        <p>{secondNumber === '' ? '0' : secondNumber}</p>
        <RenderNumbers handleChange={(num) => handleNumberChange(num, setSecondNumber)} />
      </div>

      {/* Calculate */}
      <div className="panel answer">
        <p>{total}</p>
        <div>
          <button onClick={() => calculate()}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App