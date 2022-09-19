import React from "react";
import { ReactDOM } from "react";
import { useRef } from "react";
import "./content.css"

class Converter extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         monobankAPI: this.props.mbAPI,
         inputCurrency1: "",
         inputCurrency2: "",
         valueCurrency1: "",
         valueCurrency2: "",
         ex: "buy",
      };
      this.usdRef = React.createRef()
      this.eurRef = React.createRef()
      this.uahRef = React.createRef()
      this.input_1 = React.createRef()
      this.input_2 = React.createRef()
      this.select1 = React.createRef()
      this.select2 = React.createRef()
   }

   getRate = function (code, code2) {
      return this.state.monobankAPI.filter(i => i.currencyCodeA === code && i.currencyCodeB === code2).map(f => {
         let currencyValue = Number(String(f.rateSell).slice(0, 5))
         return currencyValue
      })
   }

   getRateSell = function (code, code2) {
      return this.state.monobankAPI.filter(i => i.currencyCodeA === code && i.currencyCodeB === code2).map(f => {
         let currencyValue = Number(String(f.rateBuy).slice(0, 5))
         return currencyValue
      })
   }

   checkingValues = function (param) {
      switch (param) {
         case "input1":
            if (Boolean(this.state.valueCurrency1) && Boolean(this.state.valueCurrency2) && Boolean(this.state.inputCurrency1)) {
               let v = Number(this.state.inputCurrency1) * Number(this.state.valueCurrency1) / Number(this.state.valueCurrency2)
               this.setState({ inputCurrency2: v },
                  (e) => {
                     this.input_2.current.value = this.state.inputCurrency2
                     console.log(this.input_1.current.value)
                  })
            }
            break;
         case "input2":
            if (Boolean(this.state.valueCurrency1) && Boolean(this.state.valueCurrency2) && Boolean(this.state.inputCurrency2)) {
               let v = Number(this.state.inputCurrency2) * Number(this.state.valueCurrency2) / Number(this.state.valueCurrency1)
               this.setState({ inputCurrency1: v },
                  (e) => {
                     this.input_1.current.value = this.state.inputCurrency1
                     console.log(this.input_2.current.value)
                  })
            }
            break;
         case "change":

      }
   }

   smartConvert = function (e) {
      if (e.target.id === "input1") {
         console.log("id: " + e.target.id)
         this.setState({ inputCurrency1: Number(e.target.value) }, (e) => {
            this.checkingValues("input1")
         })
      }
      if (e.target.id === "input2") {
         console.log("id: " + e.target.id)
         this.setState({ inputCurrency2: Number(e.target.value) }, (e) => {
            this.checkingValues("input2")
         })
      }
   }
   Che = function (props) {
      return (
         <>
            <select name="currencyOne" id="select2"
               ref={this.select1}
               onChange={
                  (e) => {
                     const n = Number(e.target.value)
                     console.log("стоимость выбраной валюты 1: " + n)
                     this.setState({ valueCurrency1: n }, () => {
                        this.checkingValues("input1")
                     });
                  }}
            >

               <option > select  </option>
               <option ref={this.usdRef} value={props.getRateUsd} className="select_usd">USD</option>
               <option ref={this.eurRef} value={props.getRateEur} className="select_eur">EUR</option>
               <option ref={this.uahRef} value={1} className="select_uah">UAH</option>
            </select>
            <input type="number" name="currencyOne" id="input1"
               ref={this.input_1}
               onChange={
                  (e) => {
                     // onInput={(e) => {
                     this.smartConvert(e)
                     // this.inp(e)
                  }}
            />
            <input type="number" name="currencyTwo" id="input2"
               ref={this.input_2}
               onChange={
                  (e) => {
                     this.smartConvert(e)
                  }}
            />
            <select name="currencyTwo" id="select1"
               ref={this.select2}
               onChange={
                  (e) => {
                     const n = Number(e.target.value)
                     console.log("стоимость выбраной валюты 2: " + n)
                     this.setState({ valueCurrency2: n }, () => {
                        this.checkingValues("input2")
                     })
                  }
               }>
               <option > select  </option>
               <option ref={this.usdRef} value={props.getRateUsd} className="select_usd">USD</option>
               <option ref={this.eurRef} value={props.getRateEur} className="select_eur">EUR</option>
               <option ref={this.uahRef} value={1} className="select_uah">UAH</option>
            </select>
         </>
      )
   }

   change() {
      if (this.state.ex === "buy") {
         return (
            this.Che({ getRateUsd: this.getRate(840, 980), getRateEur: this.getRate(978, 980) })
         )
      } else if (this.state.ex === "sell") {
         return (
            this.Che({ getRateUsd: this.getRateSell(840, 980), getRateEur: this.getRateSell(978, 980) })
         )
      }
   }

   render() {
      return (
         <>
            <select name="" id=""
               className="changeCurrenty"
               onInput={
                  (e) => {
                     this.setState({ ex: e.target.value }, () => {
                        console.log("ch: " + e.target.value)
                        this.change()
                     })
                  }}
            >
               <option defaultValue="buy" className="change_buy"> buy </option>
               <option value="sell" className="change_sell"> sell </option>
            </select>
            {
               this.change()
            }
         </>

      )
   }
}

export const Content = (props) => {
   return (
      <div className="main">
         <Converter mbAPI={props.mbAPI} />
      </div>
   )
}

