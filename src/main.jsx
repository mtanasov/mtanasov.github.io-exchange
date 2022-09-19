import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Header } from "./header/Header"
import { Content } from "./content/Content"
// import { monobankAPI } from "./monobank"

(function () {
  const url = "https://api.monobank.ua/bank/currency"
  fetch(url)
    .then(responce => responce.json())
    .then(
      (result) => {
        const dataAPI = result
        console.log("ответ API получен")
        console.log(dataAPI);
        ReactDOM.createRoot(document.getElementById('root')).render(
          // <React.StrictMode>
          <div>
            <Header mbAPI={dataAPI} />
            <Content mbAPI={dataAPI} />
          </div>
          // </React.StrictMode>
        )
        // console.log(dataAPI)
      },
      (error) => {
        console.log(error)
      }
    )
}())

