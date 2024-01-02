import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Coin } from './components/Coin';

function App() {
 const [listOfCoins, setListOfCoins] = useState([]);
 const [searchWord, setSearchWord] = useState("")

  useEffect(() => {
    Axios.get("https://api.coingecko.com/api/v3/search/trending").then((response) => {
      setListOfCoins(response.data.coins);
    })
  }, [])

  const fileteredCoins = listOfCoins.filter((coin) => {
    return coin.item.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input type='text' placeholder='Search Your Coin...' onChange={(event) => {setSearchWord(event.target.value)}} />
      </div>
      <div className='cryptoDisplay'>{fileteredCoins.map((coin) => {
        return (
           <Coin key={coin.item.id} name={coin.item.name} price={coin.item.price_btc} icon={coin.item.large} symbol={coin.item.symbol} />
        )
      })}</div>
    </div>
  );
}

export default App;
