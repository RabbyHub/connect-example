// import "./App.css";

import { useConnectWallet } from "@web3-onboard/react";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [s, connect] = useConnectWallet();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
      }}
    >
      <button onClick={() => connect()} disabled={!!s.wallet}>
        {s.wallet ? "connected" : "connect"}
      </button>
    </div>
  );
}

export default App;
