import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue:'0',
    clearDisplay:false,
    operation:null,
    values:[0,0],
    currente:0
}

export default class Calculator extends Component {

    state={...initialState}

    clearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if(this.state.currente===0 && operation!=='='){
            this.setState({operation,currente:1,clearDisplay:true})
        }else{
            const equals=operation==='='
            const currenteOperation=this.state.operation
            
            const values=[...this.state.values]
            switch(currenteOperation){
                case '+':values[0] = values[0] + values[1]; break
                case '-':values[0] = values[0] - values[1]; break
                case '/':values[0] = values[0] / values[1]; break
                case '*':values[0] = values[0] * values[1]; break
                default: return
            }
            values[1]='0'
            this.setState({
                displayValue: `${values[0]}`,
                operation:operation,
                currente:equals?0:1,
                clearDisplay:!equals,
                values,
            })
        }
        console.log(this.state.displayValue)
    }
    addDigit(n){
        if(n=== '.' && this.state.displayValue.includes('.')){return}
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currenteValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currenteValue + n
        this.setState({displayValue, clearDisplay:false})

        if(n !=='.'){
            const i = this.state.currente
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
        console.log(this.state)
    }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    render(){
        return(
            <div className="calculator">
             <Display value={this.state.displayValue}/>
             <Button label="AC" click={this.clearMemory} triple/>
             <Button label="/" click={this.setOperation} operation/>
             <Button label="7" click={this.addDigit}/>
             <Button label="8" click={this.addDigit}/>
             <Button label="9" click={this.addDigit}/>
             <Button label="*" click={this.setOperation} operation/>
             <Button label="4" click={this.addDigit}/>
             <Button label="5" click={this.addDigit}/>
             <Button label="6" click={this.addDigit}/>
             <Button label="-" click={this.setOperation} operation/>
             <Button label="1" click={this.addDigit}/>
             <Button label="2" click={this.addDigit}/>
             <Button label="3" click={this.addDigit}/>
             <Button label="+" click={this.setOperation} operation/>
             <Button label="0" click={this.addDigit} double/>
             <Button label="." click={this.addDigit}/>
             <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}