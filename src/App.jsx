import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [tokens, setTokens] = useState([]);
  const QueryURL = "https://gateway.thegraph.com/api/[api-key]]/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
  const client = createClient({
    url: QueryURL
  });
  const query =
    `
  {
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }
  `;

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.tokens);
    };
    getTokens();
  }, []);

  return (
    <>
      <div  >
        <h1 style={{
        backgroundColor: 'blue',
        width: '100px',
        height: '100px'
      }}>Tokens Information on Uniswap Subgraph</h1>
        {tokens !== null && tokens.length > 0 && tokens.map((token) => {
          return (
            
            <div key={token.id}>
              <div>{token.id}</div>
              <div>{token.name}</div>
              <div>{token.symbol}</div>
              <div>{token.decimals}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
