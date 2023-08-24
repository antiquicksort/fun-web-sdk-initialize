import "./styles.css";
import {
  convertToValidUserId,
  useConnector,
  useCreateFun,
  useFun,
  shallow,
  configureNewFunStore,
  MetamaskConnector,
  CoinbaseWalletConnector,
  WalletConnectConnector,
  SocialOauthConnector,
  SUPPORTED_OAUTH_PROVIDERS,
  Goerli,
  usePrimaryAuth,
} from "@fun-xyz/react";

const DEFAULT_FUN_WALLET_CONFIG = {
  apiKey: "hnHevQR0y394nBprGrvNx4HgoZHUwMet5mXTOBhf",
  chain: Goerli,
};

const DEFAULT_CONNECTORS = [
  MetamaskConnector(),
  CoinbaseWalletConnector("FUN EXAMPLE APP NAME"),
  WalletConnectConnector(),
  SocialOauthConnector(SUPPORTED_OAUTH_PROVIDERS),
];

configureNewFunStore({
  config: DEFAULT_FUN_WALLET_CONFIG,
  connectors: DEFAULT_CONNECTORS,
});



export default function App() {
  const { activate, account: connectorAccount } = useConnector({ index: 0, autoConnect: true });
  const { account, initializeFunAccount, funWallet } = useCreateFun()
  const [auth] = usePrimaryAuth()

  const initializeSingleAuthFunAccount = async () => {
    if (!connectorAccount) {
      console.log(await activate())
      return
    }
    initializeFunAccount({
      users: [{ userId: convertToValidUserId(connectorAccount) }],
      index: 214
    }).catch()
    console.log(connectorAccount)
  }

  const funWalletAction = async () => {
    //Do what you need with the funWallet and auth object.
    //Refer to the core sdk docs for actions.
    const op = await funWallet.create(auth, await auth.getUserId())

    //Make sure your wallet has funds. 
    await funWallet.executeOperation(auth, op)
  }

  return (
    <div className="App">
      <h1>Initialize single Auth wallet example</h1>
      <h2>Fun Wallet Account Address: {account}</h2>
      <button onClick={initializeSingleAuthFunAccount}>Initialize Single Auth Wallet</button>
      <br></br>
      <br></br>
      {funWallet ?
        <button onClick={funWalletAction}>Create Fun Wallet</button>
        : <></>
      }
    </div>
  );
}