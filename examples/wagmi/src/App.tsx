import { useEnsAvatar, useEnsName } from "wagmi";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Desc = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h2>How to connect Rabby Wallet with Wagmi </h2>
      <p>
        Please install{" "}
        <a
          target="_blank"
          href="https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch"
        >
          Rabby wallet
        </a>{" "}
        first.
      </p>
      <p>
        if you want to connect Rabby Wallet within wagmi, you should use
        InjectedConnector
      </p>
      <p>
        {`If you have only configured MetaMaskConnector, which does not support Rabby Wallet, you could add InjectedConnector for Rabby Wallet. `}
        <a
          href="https://github.com/RabbyHub/connect-example/blob/main/examples/wagmi/src/App.tsx"
          target="_blank"
        >
          current code
        </a>
      </p>

      {children}
    </div>
  );
};

export function App() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && connector) {
    return (
      <Desc>
        <div>Connected to {connector.name}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
        <div>
          {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" />}
          <div>{ensName ? `${ensName} (${address})` : address}</div>
        </div>
      </Desc>
    );
  }

  return (
    <Desc>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </button>
        ))}

        {/* <button
          onClick={() => {
            connectors.some((connector) => {
              if (connector.ready) {
                connect({ connector });
                return true;
              }
              return false;
            });
          }}
        >
          connect
        </button> */}

        {error && <div>{error.message}</div>}
      </div>
    </Desc>
  );
}

export default App;
