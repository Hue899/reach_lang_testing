import React, { useState, useEffect } from "react";
import * as backend from "../build/index.main.mjs";
import MyAlgoConnect from '@randlabs/myalgo-connect'
const reach = loadStdlib("ALGO");

reach.setWalletFallback(reach.walletFallback({ providerEnv: "TestNet", MyAlgoConnect,}));
const { standardUnit } = reach;
const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

export const ReachContext = React.createContext();

const ReachContextProvider = ({children}) => {
	const [view, setView] = useState('ConnectAccount');
	const [defaultFundAmt, setDefaultFundAmt] = useState('10');
	const [defaultMin, setDefaultMin] = useState('5');
	const [standardUnit, setStandardUnit] = useState('Algos');
	const [acc, setAcc] = useState(null);
	const [ctc, setCtc] = useState(null);
	const [ready, setReady] = useState(false);
	const [ctcInfoStr, setCtcInfoStr] = useState(null);
	const [min, setMin] = useState(null);
	const [addr, setAddr] = useState(null);
	const [amt, setAmt] = useState(null);
	const [winAdd, setWinAdd] = useState(null);
	const [highBid, setHighBid] = useState(null);
	const [bid, setBid] = useState(null);
	const [ctc2, setCtc2] = useState(null);
	const [mBid, setMBid] = useState(null);
	const [nId, setNId] = useState(null);
	const [cBid, setCBid] = useState(null);
	const [ContentView, setContentView] = useState(null);
	
	useEffect (() => {
		async function getAcc() {
			const acc = await loadStdlib.getDefaultAccount();
			setAcc(acc);
			setView('Intro');
		}
		getAcc();
	}, []);

	const start = () => {
		setView('DeployerOrAttacher');
	}

	const selectCreator = async () => {
		const acc = await loadStdlib.newAccountMnemonic('order benefit case nothing critic bridge fresh young oval weasel lizard prosper aware trick blame coast shaft brother blade quick liberty skirt pizza abandon prosper');
		const ctc = acc.contract(backend)
		setView('Wrapper');
		setContentView(Creator);
		setReady(false);
		setAcc(acc);
		setCtc(ctc);
	}

	const selectBidder = () => {
		setView('Wrapper');
		setContentView(Bidder);
	}

	const setInfo = () =>  {
		setView('SetInfo');
	}

	const deploy = async () => {
		setView('Deploying');
		setMin(stdlib.parseCurrency(min));
		backend.Creator(ctc, this);
		const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
		setView('WaitingForAttacher');
		setCtcInfoStr(ctcInfoStr);
	}

	const getSale = async () => {
		const theNFT = await stdlib.launchToken(acc, "ReachNFT", "RNFT", {supply: 1});
		const params = {
			nftId: theNFT.id,
			minBid: stdlib.parseCurrency(min),
			lenInBlocks: 100,
		};
		setAmt(0);
		return params;
	}

	const auctionReady = () => {
		setReady(true);
		console.log(ctc);
		console.log('Auction Ready');
	}

	const seeBid = (ad, am) => {
		const addr = stdlib.formatAddress(ad);
		const amt = stdlib.formatCurrency(am);
		setView('WaitingForAttacher');
		setAddr(addr);
		setAmt(amt);
	}


	const showOutcome = (addr, amt) => {
		setView('ShowOutcome');
		setWinAdd(stdlib.formatAddress(addr));
		setHighBid(stdlib.formatCurrency(amt));
	}

	const attach = async (ctcInfoStr) => {
		const acc = await stdlib.getDefaultAccount();
		const ctc2 = acc.contract(backend, JSON.parse(ctcInfoStr));
		const tBid = await ctc2.v.min();
		const mBid = stdlib.formatCurrency(stdlib.bigNumberToNumber(tBid[1]));
		const tId = await ctc2.v.nft();
		const nID = stdlib.bigNumberToNumber(tId[1]);
		const tcBid = await ctc2.v.currBid();
		const cBid = stdlib.formatCurrency(stdlib.bigNumberToNumber(tcBid[1]));
		setView('Bid');
		setCtc2(ctc2);
		setMBid(mBid);
		setNId(nId);
		setCBid(cBid);
	}

	const bidFunc = async () => {
		const tctc = ctc2;
		const bid = stdlib.parseCurrency(bid);
		const [add, b] = await tctc.apis.Bidder.bid(bid);
		setView('WaitingForTurn');
		setAddr(stdlib.formatAddress(add));
		setBid(stdlib.formatCurrency(b));
	
		const setBid = (bid) => {
		setView('WaitingForTurn');
		setBid(bid);
		}
	}
	
	const ReachContextValues = {
		...defaults,
		view, setView,
      	defaultFundAmt, setDefaultFundAmt,
      	defaultMin, setDefaultMin,
      	standardUnit, setStandardUnit,
      	acc, setAcc,
      	ctc, setCtc,
      	ready, setReady,
      	ctcInfoStr, setCtcInfoStr,
      	min, setMin,
      	addr, setAddr,
      	amt, setAmt,
      	winAdd, setWinAdd,
		highBid, setHighBid,
		bid, setBid,
		ctc2, setCtc2,
		mBid, setMBid,
		nId, setNId,
		cBid, setCBid,
		ContentView, setContentView,
		start,
		selectCreator,
		selectBidder,
		setInfo,
		deploy,
		getSale,
		auctionReady,
		seeBid,
		showOutcome,
		attach,
		bidFunc,
		setBid,
	};

	return (
		<ReachContext.Provider value={ReachContextValues}>
			{children}
		</ReachContext.Provider>
	);
};
	 
export default ReachContextProvider;
