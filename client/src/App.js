import React from 'react';
import { Container } from 'react-dom';
import AccountList from './components/accountList';

function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:8081/api/accounts/').then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
    });
  }, []);

  return (
    <div className="App">
      <AccountList items={items}/>
    </div>
  )
}

export default App;