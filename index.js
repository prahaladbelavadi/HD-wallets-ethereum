const bip39 = require('bip39')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')
var Web3 = require('web3');

const mnemonic = bip39.generateMnemonic(); //generates string
console.log("Mnemonic:",mnemonic);

const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer

const root = hdkey.fromMasterSeed(seed)

const masterPrivateKey = root.privateKey.toString('hex');
console.log("Master private Key:",masterPrivateKey);

const masterPubKey = root.publicKey.toString('hex');
console.log("Master Public Key: ",masterPubKey);

var path = "m/44'/60'/0'/0/0";

const addrNode = root.derive(path)
console.log("path: ", path);

const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
console.log("Pubkey as hex:",pubKey.toString('hex'));

const addr = ethUtil.publicToAddress(pubKey).toString('hex');
console.log("pubkey to Addr:",addr);

const address = ethUtil.toChecksumAddress(addr)
console.log("Address with Check sum:",address);


// transaction builder
const PrivBuffKey = Buffer.from(masterPrivateKey, 'hex')
const params = {
  nonce:0,
  to: '0x4584158529818ef77D1142bEeb0b6648BD8eDb2f',
  value: '1000',
  gasPrice: 5000000000,
  gasLimit: 21000,
  chainId: 3
}


const tx = new ethTx(params);
tx.sign(addrNode._privateKey); // Signing the transaction
const serializedTx = tx.serialize()
console.log('Serialized transaction:',serializedTx.toString('hex'));

console.log('\n');
