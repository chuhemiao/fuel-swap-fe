import { Wallet } from 'fuels';
import { useEffect, useState } from 'react';
import './App.css';
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractAbi__factory } from './contracts';

// The address of the contract deployed the Fuel testnet
const CONTRACT_ID =
  'fuel1dgvshwutpcr9w3u0kq5wfmpurzzdqlln4f24t3xa84uppl3vxdlqn5mcpt';

//the private key from createWallet.js
const WALLET_SECRET =
  '0xd4c579fbaa4019781d3b460fd1569e73203fe68e4d2bb42dd80cb6ef01be9185';

// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
const wallet = Wallet.fromPrivateKey(
  WALLET_SECRET,
  'https://node-beta-2.fuel.network/graphql'
);

// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function main() {
      // Executes the counter function to query the current contract state
      // the `.get()` is read-only, because of this it don't expand coins.
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    }
    main();
  }, []);

  async function increment() {
    // a loading state
    setLoading(true);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.increment().txParams({ gasPrice: 1 }).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Counter: {counter}</p>
        <button disabled={loading} onClick={increment}>
          {loading ? 'Incrementing...' : 'Increment'}
        </button>
      </header>
    </div>
  );
}
export default App;
