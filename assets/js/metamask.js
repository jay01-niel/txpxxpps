var web3;
var walletAddress;
var withdrawForm = document.getElementById("withdrawalDetails");
var transferForm = document.getElementById("transForm");
var depositForm = document.getElementById("depositDetails");

const presaleContract = "0xc4bF92Db66caE45436dEb6b54fA06c0fF1d4c7a0";
const presaleAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claim",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "closeClaiming",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "CloseClaiming",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Contribute",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "openClaiming",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "OpenClaiming",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousAdmin",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deployer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalBNBDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalTokensDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalTokensSold",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isClaimingOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "remainingTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPriceInBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalBNBDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokensDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokensSold",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const tokenContract = "0x0cd95B01250802885E36053A17Dbf4fA30Ec7B17";
const tokenAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "exclidedFromTax",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var BALANCE;
let provider;

var sold = document.getElementById("sold");
var left = document.getElementById("left");
var total = document.getElementById("totalRaised");
var valueDeposited = document.getElementById("valueDollar");
var totaTara = document.getElementById("totalTara");
const weiToEther = (value) =>
  Number(ethers.utils.formatEther(value)).toFixed(2);
const etherToWei = (value) => ethers.utils.parseEther(value.toString());

document.addEventListener("DOMContentLoaded", async function () {
  await Connect();
});

function notify(msg) {
  Toastify({
    text: `${msg}`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function Tnxnotify(msg) {
  Toastify({
    text: `${msg}`,
    duration: 7000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
async function Connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      const networkId = await web3.eth.net.getId();
      // 841
      if (networkId !== 841) {
        notify("Please switch to Taraxa Mainnet.");
        return;
      }

      const accounts = await web3.eth.getAccounts();
      walletAddress = accounts[0];

      await fetchData();

      const buttonText = document.getElementById("buttonText");

      buttonText.innerText = shortenAddress(walletAddress);

      document.getElementById("buttonText").disabled = true;
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      notify("Error connecting to wallet.");
    }
  } else {
    notify("Please install MetaMask.");
  }
}

async function fetchData() {
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    const TokenSold = await contract.methods.getTotalTokensSold().call();
    const TokenLeft = await contract.methods.getTotalTokensDeposited().call();
    const totalNativeToken = await contract.methods
      .getTotalBNBDeposited()
      .call();
    const isOpen = await contract.methods.isClaimingOpen().call();

    const claimBtn = document.getElementById("claimBtn");
    if (!isOpen) claimBtn.disabled = true;

    sold.innerText = weiToEther(TokenSold);
    left.innerText = weiToEther(TokenLeft);
    total.innerText = weiToEther(totalNativeToken);
    totaTara.innerText = weiToEther(totalNativeToken) + "tara";
    valueDeposited.innerText = Math.round(weiToEther(totalNativeToken) * 0.006) + "$";

    var percentage = Math.round(
      (weiToEther(TokenSold) / weiToEther(TokenLeft)) * 100
    );
    const p = document.getElementById("percentageBar");
    p.style.width = percentage + "%";
    p.innerText = percentage + "%";
  } catch (e) {
    console.log(e);
  }
}



depositForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!walletAddress) {
    notify("Please connect your wallet first");
    return;
  }
  const amount = document.getElementById("DAmount").value;
  const buyBtn = document.getElementById("dBtn");

  if (amount <= 0) {
    notify("Amount cannot be 0");
    return;
  }

  buyBtn.disabled = true;
  buyBtn.innerText = "Processing...";
  await depositToken(amount);
  buyBtn.disabled = false;
  buyBtn.innerText = "depositTokens";
});

withdrawForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!walletAddress) {
    notify("Please connect your wallet first");
    return;
  }
  const amount = document.getElementById("WAmoun").value;
  const buyBtn = document.getElementById("wBtn");

  if (amount <= 0) {
    notify("Amount cannot be 0");
    return;
  }

  buyBtn.disabled = true;
  buyBtn.innerText = "Processing...";
  await withdrawTokens(amount);
  buyBtn.disabled = false;
  buyBtn.innerText = "WithdrawTokens";
});

transferForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!walletAddress) {
    notify("Please connect your wallet first");
    return;
  }
  const add = document.getElementById("wAddress").value;
  const buyBtn = document.getElementById("tBtn");

  if (!add) {
    notify("Address must be provided");
    return;
  }
  buyBtn.disabled = true;
  buyBtn.innerText = "Processing...";

  await transferOwnerToNew(add);
  buyBtn.disabled = false;
  buyBtn.innerText = "TransferOwnership";
});

async function buyPresale(amount) {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  if(amount <  19700 || amount > 394000){
    notify("Amount must not exceed the min and max");
    return;
  }
  try {
    Tnxnotify("Transaction has been sent to your wallet, please confirm...");
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods
      .contribute()
      .send({ from: walletAddress, value: etherToWei(amount) });
    Tnxnotify("Transaction was successful.");
    await fetchData();
  } catch (e) {
    console.log(e);
    notify("An Error Occured: Error buying presale.");
  }
}

async function openClaiming() {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods.openClaiming().send({ from: walletAddress });
    notify("Claiming has been opened.");
  } catch (e) {
    notify("An Error Occured: Error opening claiming. Not an Admin");
  }
}

async function claimToken() {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    const isOpen = await contract.methods.isClaimingOpen().call();
    if (isOpen) {
      await contract.methods.claimTokens().send({ from: walletAddress });
      notify("Tokens has been claimed successfully.");
    } else {
      notify("Claiming is not open yet.");
    }
  } catch (e) {
    notify("An Error Occured: Error  claiming");
    console.log(e);
  }
}

async function closeClaiming() {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods.closeClaiming().send({ from: walletAddress });
    notify("Claiming has been closed.");
  } catch (e) {
    notify("An Error Occured: Error closing claiming. Not an Admin");
  }
}
async function withdrawFunds() {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods.withdrawFunds().send({ from: walletAddress });
    notify("Funds has been withdrawn successfully.");
  } catch (e) {
    notify("An Error Occured: Error withdrawing. Not an Admin");
  }
}
async function withdrawTokens(amount) {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods
      .withdrawTokens(etherToWei(amount))
      .send({ from: walletAddress });
    notify("Funds has been withdrawn successfully.");
  } catch (e) {
    notify("An Error Occured: Error withdrawing. Not an Admin");
  }
}
async function depositToken(amount) {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    const token = new web3.eth.Contract(tokenAbi, tokenContract);
    const isAllowance = await token.methods.allowance(walletAddress, presaleContract).call();
    if(isAllowance < amount){
      await token.methods
      .approve(presaleContract, etherToWei(amount))
      .send({ from: walletAddress });
    }
    await contract.methods
      .depositTokens(etherToWei(amount))
      .send({ from: walletAddress });
    notify("Funds has been deposited successfully.");
  } catch (e) {
    console.log(e); 
    notify("An Error Occured: Error depositing. Not an Admin");
  }
}


async function transferOwnerToNew(address) {
  if (!walletAddress) {
    notify("Please connect your wallet.");
    return;
  }
  try {
    const contract = new web3.eth.Contract(presaleAbi, presaleContract);
    await contract.methods
      .transferOwnership(address)
      .send({ from: walletAddress });
    notify("Ownership has been transferred successfully.");
  } catch (e) {
    notify("An Error Occured: Error transfering. Not an Admin");
    console.log(e);
  }
}

function shortenAddress(address) {
  if (address.length <= 9) {
    return address; // Address is already short
  }
  const firstFour = address.slice(0, 4);
  const lastFive = address.slice(-5);
  return `${firstFour}...${lastFive}`;
}

function smShortenAddress(address) {
  if (address.length <= 9) {
    return address; // Address is already short
  }
  const firstFour = address.slice(0, 3);
  const lastFive = address.slice(-3);
  return `${firstFour}...${lastFive}`;
}
