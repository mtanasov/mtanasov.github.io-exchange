import React from "react";
import { ReactDOM } from "react";
import "./header.css"

class Valuta extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: true,
         items: this.props.mbAPI
      };
   }

   getPrice = (code, code2, currency, arr) => {
      return (arr.filter(i => i.currencyCodeA === code && i.currencyCodeB === code2).map(f => {
         return (
            <div className="valutaHeader" key={f.currencyCodeA}>
               <span className="nCurrency">
                  {currency}
               </span>
               <span className="buy">
                  {String(f.rateBuy).slice(0, 5)}
               </span>
               <span className="sell">
                  {String(f.rateSell).slice(0, 5)}
               </span>
            </div>
         )

      })
      )
   }

   render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
         return (
            <span>ERROR {error.message} </span>
         )
      } else if (!isLoaded) {
         return <span> Loading...</span>
      } else {
         return (
            <div className="v">
               {/* { */}
               <span className="usd">{this.getPrice(840, 980, "USD", items)}</span>
               <span className="eur">{this.getPrice(978, 980, "EUR", items)}</span>
            </div>
         )
      }
   }
}

export function Header(props) {
   return (
      <div id="header">
         <h1> monobank exchange</h1>
         <Valuta mbAPI={props.mbAPI} />
      </div>
   )
}

