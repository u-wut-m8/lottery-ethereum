const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

let provider = new HDWalletProvider(
  "update fossil bright dust doll memory shock crater neutral never bronze hole",
  "https://rinkeby.infura.io/v3/dcba2c5ecde54489b258f74a10e4a74e"
);

const web3 = new Web3(provider);

let inbox;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account ", accounts[0]);
  inbox = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({
                  data: "0x" + bytecode
                }).send({
                  from: accounts[0],
                  gas: "1000000"
                });
  inbox.setProvider(provider);
};

deploy().then(() => {
  console.log("Contract deployed at address: ", inbox.options.address);
  return;
}).catch((err) => {
  console.log(err);
});
