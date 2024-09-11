import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import './App.css'
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'

function App() {
  const [mnemonic, setMnemonic] = useState("");
  let [count, setCount] = useState(0)
  const [keys, setKeys] = useState([""])
  const path = `m/44'/501'/${count}'/0'`
  const generatePhrase = async () => {
    const seedphrase = generateMnemonic();
    setMnemonic(seedphrase)
  }

  const generateWallet = async () => {
    if (!mnemonic) {
      alert("first generete mnemonic")
    }
    const seed = mnemonicToSeedSync(mnemonic)
    const derivepath = derivePath(path, seed.toString()).key
    const keypair = Keypair.fromSeed(derivepath)
    setKeys(prev => [...prev, keypair.publicKey.toBase58()])
    setCount(prev => prev + 1);
    console.log(count)



  }
  return (
    <div>
      <button onClick={generatePhrase}>create seed phrase</button>
      <div>
        {mnemonic}
      </div>
      <div>
        <button onClick={generateWallet}>generate a solana wallet</button>
      </div>

      <div>
        all private keys
        {keys.map(el => {
          return <div>
            {el}
          </div>
        })}
      </div>

    </div>
  )

}

export default App
