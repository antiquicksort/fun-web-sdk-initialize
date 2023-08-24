import "./styles.css";
import {
  convertToValidUserId,
  useConnector,
  useCreateFun,
  configureNewFunStore,
  MetamaskConnector,
  Goerli,
  usePrimaryAuth,
} from "@fun-xyz/react";


//Step 1: Initialize the FunStore. This action configures your environment based on your ApiKey, chain, and the authentication methods of your choosing. 
const DEFAULT_FUN_WALLET_CONFIG = {
  apiKey: "hnHevQR0y394nBprGrvNx4HgoZHUwMet5mXTOBhf",
  chain: Goerli,
};

const DEFAULT_CONNECTORS = [
  MetamaskConnector(),
];

configureNewFunStore({
  config: DEFAULT_FUN_WALLET_CONFIG,
  connectors: DEFAULT_CONNECTORS,
});

//Step 2: Use the connector button to connect your authentication method, in this case metamask. 
const ConnectorButton = ({ index }) => {
  const { active, activate, deactivate, connectorName, connector } = useConnector({ index });

  return (<button
    style={{ margin: "8px" }}
    onClick={() => {
      if (active) {
        deactivate(connector)
        return
      }
      activate(connector)
    }
    }>{connectorName} {active ? ("Connected") : ("Not connected")}</button>)
}

export default function App() {
  const { account: connectorAccount } = useConnector({ index: 0, autoConnect: true });

  //Step 3: Use the initializeFunAccount method to create your funWallet object
  const { account, initializeFunAccount, funWallet } = useCreateFun()

  //Step 4: Use the auth and funWallet to perform actions (ie: swap, transfer, etc.)
  const [auth] = usePrimaryAuth()

  const initializeSingleAuthFunAccount = async () => {
    // if (!connectorAccount) {
    //   console.log(await activate())
    //   return
    // }
    initializeFunAccount({
      users: [{ userId: convertToValidUserId(connectorAccount) }],
      index: 214
    }).catch()
  }

  return (
    <div className="App">
      <h1>Initialize Fun Wallet Object with Solo Authentication (Metamask)</h1>
      1. Connect Metamask.
      <ConnectorButton key={0} index={0} ></ConnectorButton>
      <br></br>
      2. Initialize the Fun Wallet and Auth object.
      <button onClick={initializeSingleAuthFunAccount}>Initialize Wallet</button>
      <br></br>
      <br></br>
      {account ?
        <div>
          <h2>Fun Wallet Account Address: {account}</h2>
          {JSON.stringify(account)}
        </div>
        : <></>
      }
      {funWallet ?
        <div>
          <h2>Fun Wallet Object: </h2>
          {JSON.stringify(funWallet)}
        </div>
        : <></>
      }
      {
        auth ?
          <div>
            <h2>Auth Object: </h2>
            {JSON.stringify(auth)}
          </div>
          : <></>
      }
    </div>
  );
}