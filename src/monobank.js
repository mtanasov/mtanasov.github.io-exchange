export const monobankAPI = () => {
   const url = "https://api.monobank.ua/bank/currency"
   return fetch(url)
      .then(responce => responce.json())
      .then(
         (result) => {
            const dataAPI = result
            console.log("данные из API получены")
            // console.log(dataAPI)
            return dataAPI
         },
         (error) => {
            console.log(error)
         }
      )
}