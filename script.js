<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">

<title>ARIF AI Scan Bot</title>

<style>
*{
  box-sizing:border-box;
  -webkit-tap-highlight-color:transparent;
}

html,body{
  margin:0;
  width:100%;
  height:100%;
  background:#071018;
  color:#fff;
  font-family:Arial,sans-serif;
}

body{
  overflow:hidden;
}

/* =========================
   FLOATING BUTTON
========================= */

#orb{
  position:fixed;
  right:18px;
  bottom:90px;

  width:64px;
  height:64px;

  border-radius:50%;

  background:
    radial-gradient(circle at 35% 30%,#5fc7ff,#0875e8 55%,#003a86);

  border:2px solid rgba(255,255,255,.35);

  box-shadow:
    0 5px 25px rgba(0,0,0,.65),
    0 0 18px rgba(0,130,255,.45);

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:27px;
  font-weight:bold;

  z-index:9999;

  user-select:none;
  touch-action:none;
}

#orb.scanning{
  animation:pulse 1s infinite;
}

@keyframes pulse{
  0%{transform:scale(1)}
  50%{transform:scale(1.08)}
  100%{transform:scale(1)}
}

/* =========================
   BOARD
========================= */

#board{
  position:fixed;

  right:12px;
  bottom:165px;

  width:300px;
  max-width:calc(100vw - 24px);

  max-height:75vh;

  overflow:auto;

  background:
    linear-gradient(
      145deg,
      rgba(15,36,55,.98),
      rgba(4,13,22,.98)
    );

  border:1px solid #28516d;

  border-radius:22px;

  box-shadow:
    0 15px 45px rgba(0,0,0,.65),
    0 0 25px rgba(0,130,255,.12);

  padding:14px;

  display:none;

  z-index:9998;
}

#board.open{
  display:block;
}

/* HEADER */

.header{
  display:flex;
  align-items:center;
  justify-content:space-between;

  padding-bottom:11px;
  border-bottom:1px solid #1e394d;
}

.title{
  font-size:19px;
  font-weight:900;
}

.status{
  font-size:9px;
  color:#39e79b;
}

/* SETTINGS */

.row{
  display:flex;
  gap:7px;
  margin-top:10px;
}

.field{
  flex:1;
}

label{
  display:block;
  font-size:9px;
  color:#7894a9;
  margin-bottom:5px;
}

select,input{
  width:100%;
  height:40px;

  border-radius:10px;

  border:1px solid #294b62;

  background:#06111a;

  color:white;

  padding:0 9px;

  outline:none;
}

/* BUTTON */

.scan{
  width:100%;
  height:46px;

  margin-top:10px;

  border:0;
  border-radius:12px;

  color:#fff;

  font-weight:900;
  font-size:14px;

  background:
    linear-gradient(
      135deg,
      #1593ff,
      #0057bb
    );
}

/* RESULT */

.result{
  margin-top:11px;

  padding:16px 10px;

  text-align:center;

  border-radius:17px;

  background:#050e16;

  border:1px solid #23475f;
}

.caption{
  font-size:8px;
  color:#718da3;
  letter-spacing:1.2px;
}

.signal{
  font-size:29px;
  font-weight:900;

  margin:8px 0;
}

.wait{
  color:#a7bdcd;
}

.call{
  color:#36e69a;
}

.put{
  color:#ff6477;
}

.none{
  color:#ffc857;
}

.conf{
  font-size:12px;
  color:#c6d7e4;
}

.progress{
  height:5px;

  margin-top:10px;

  border-radius:10px;

  overflow:hidden;

  background:#152a3a;
}

.bar{
  width:0%;
  height:100%;

  background:#168cff;

  transition:.4s;
}

/* ANALYSIS */

.grid{
  display:grid;

  grid-template-columns:1fr 1fr;

  gap:7px;

  margin-top:10px;
}

.box{
  background:#07131e;

  border:1px solid #1b374b;

  border-radius:10px;

  padding:9px;
}

.box span{
  display:block;

  color:#6f8ca1;

  font-size:8px;
}

.box b{
  display:block;

  margin-top:4px;

  font-size:11px;
}

/* LOG */

.log{
  margin-top:9px;

  padding:10px;

  min-height:55px;

  border-radius:11px;

  background:#06101a;

  color:#8da7ba;

  font-size:9px;

  line-height:1.6;
}

/* CLOSE */

.close{
  width:100%;

  margin-top:9px;

  height:35px;

  border:0;

  border-radius:9px;

  background:#142736;

  color:#a9bdca;

  font-size:11px;
}
</style>
</head>

<body>

<!-- FLOATING BUTTON -->

<div id="orb">⚡</div>


<!-- SCANNER BOARD -->

<div id="board">

  <div class="header">

    <div class="title">
      ⚡ ARIF AI
    </div>

    <div class="status" id="status">
      READY
    </div>

  </div>


  <div class="row">

    <div class="field">

      <label>MARKET</label>

      <select id="symbol">

        <option value="EUR/USD">EUR/USD</option>
        <option value="GBP/USD">GBP/USD</option>
        <option value="USD/JPY">USD/JPY</option>
        <option value="USD/CHF">USD/CHF</option>
        <option value="AUD/USD">AUD/USD</option>
        <option value="USD/CAD">USD/CAD</option>
        <option value="XAU/USD">XAU/USD</option>
        <option value="BTC/USD">BTC/USD</option>

      </select>

    </div>


    <div class="field">

      <label>TIMEFRAME</label>

      <select id="interval">

        <option value="1min">1 MIN</option>
        <option value="5min">5 MIN</option>
        <option value="15min">15 MIN</option>
        <option value="30min">30 MIN</option>
        <option value="1h">1 HOUR</option>

      </select>

    </div>

  </div>


  <div style="margin-top:9px">

    <label>MARKET DATA API KEY</label>

    <input
      id="apiKey"
      type="password"
      placeholder="Paste API key">

  </div>


  <button
    class="scan"
    id="scanButton"
    onclick="startScan()">

    🔍 DEEP SCAN

  </button>


  <div class="result">

    <div class="caption">
      MULTI-CONFIRMATION ANALYSIS
    </div>


    <div
      id="signal"
      class="signal wait">

      NO SIGNAL

    </div>


    <div
      id="confidence"
      class="conf">

      Waiting for market data

    </div>


    <div class="progress">

      <div
        id="bar"
        class="bar">
      </div>

    </div>


    <div class="grid">

      <div class="box">
        <span>TREND</span>
        <b id="trend">—</b>
      </div>

      <div class="box">
        <span>MOMENTUM</span>
        <b id="momentum">—</b>
      </div>

      <div class="box">
        <span>EMA</span>
        <b id="ema">—</b>
      </div>

      <div class="box">
        <span>RSI</span>
        <b id="rsi">—</b>
      </div>

      <div class="box">
        <span>MACD</span>
        <b id="macd">—</b>
      </div>

      <div class="box">
        <span>STRUCTURE</span>
        <b id="structure">—</b>
      </div>

    </div>


    <div
      id="log"
      class="log">

      Scanner ready. Press DEEP SCAN.

    </div>

  </div>


  <button
    class="close"
    onclick="closeBoard()">

    CLOSE BOARD

  </button>

</div>


<script>

/* =========================================
   ARIF AI SCANNER
========================================= */

const orb =
document.getElementById("orb");

const board =
document.getElementById("board");

let scanning=false;


/* =========================================
   FLOATING BUTTON
========================================= */

orb.addEventListener(
  "click",
  function(){

    if(scanning) return;

    board.classList.toggle("open");

  }
);


/* =========================================
   CLOSE
========================================= */

function closeBoard(){

  board.classList.remove("open");

}


/* =========================================
   API DATA
========================================= */

async function getCandles(){

  const key =
  document
  .getElementById("apiKey")
  .value
  .trim();

  if(!key){

    throw new Error(
      "API KEY বসান"
    );

  }


  const symbol =
  document
  .getElementById("symbol")
  .value;


  const interval =
  document
  .getElementById("interval")
  .value;


  const url =
  "https://api.twelvedata.com/time_series" +

  "?symbol=" +
  encodeURIComponent(symbol) +

  "&interval=" +
  encodeURIComponent(interval) +

  "&outputsize=250" +

  "&order=asc" +

  "&timezone=UTC" +

  "&apikey=" +
  encodeURIComponent(key);


  const response =
  await fetch(url);


  if(!response.ok){

    throw new Error(
      "Market server response error"
    );

  }


  const data =
  await response.json();


  if(data.status === "error"){

    throw new Error(
      data.message || "API error"
    );

  }


  if(!data.values ||
     data.values.length < 80){

    throw new Error(
      "পর্যাপ্ত candle data পাওয়া যায়নি"
    );

  }


  return data.values.map(c => ({

    time:c.datetime,

    open:Number(c.open),

    high:Number(c.high),

    low:Number(c.low),

    close:Number(c.close)

  }));

}


/* =========================================
   EMA
========================================= */

function EMA(values,period){

  if(values.length < period)
    return null;


  const k =
  2/(period+1);


  let ema =
  values[0];


  for(
    let i=1;
    i<values.length;
    i++
  ){

    ema =
      values[i]*k +
      ema*(1-k);

  }


  return ema;

}


/* =========================================
   RSI
========================================= */

function RSI(values,period=14){

  if(values.length <= period)
    return 50;


  let gain=0;
  let loss=0;


  for(
    let i=1;
    i<=period;
    i++
  ){

    const diff =
    values[i]-values[i-1];


    if(diff>0)
      gain+=diff;

    else
      loss+=Math.abs(diff);

  }


  let avgGain =
  gain/period;

  let avgLoss =
  loss/period;


  for(
    let i=period+1;
    i<values.length;
    i++
  ){

    const diff =
    values[i]-values[i-1];


    const g =
    Math.max(diff,0);


    const l =
    Math.max(-diff,0);


    avgGain =
      ((avgGain*(period-1))+g)
      /period;


    avgLoss =
      ((avgLoss*(period-1))+l)
      /period;

  }


  if(avgLoss===0)
    return 100;


  const rs =
  avgGain/avgLoss;


  return 100 -
  (100/(1+rs));

}


/* =========================================
   MACD
========================================= */

function MACD(values){

  const fast =
  EMA(values.slice(-100),12);

  const slow =
  EMA(values.slice(-100),26);


  if(fast===null ||
     slow===null)
    return 0;


  return fast-slow;

}


/* =========================================
   DEEP ANALYSIS
========================================= */

function analyze(data){

  const close =
  data.map(c=>c.close);


  const last =
  data[data.length-1];


  const ema9 =
  EMA(close.slice(-120),9);


  const ema21 =
  EMA(close.slice(-120),21);


  const ema50 =
  EMA(close.slice(-120),50);


  const rsi =
  RSI(close,14);


  const macd =
  MACD(close);


  const recent =
  data.slice(-30);


  const support =
  Math.min(
    ...recent.map(c=>c.low)
  );


  const resistance =
  Math.max(
    ...recent.map(c=>c.high)
  );


  let bull=0;
  let bear=0;


  /* TREND */

  if(
    ema9>ema21 &&
    ema21>ema50
  )
    bull+=2;


  if(
    ema9<ema21 &&
    ema21<ema50
  )
    bear+=2;


  /* PRICE */

  if(last.close>ema9)
    bull++;


  if(last.close<ema9)
    bear++;


  /* RSI */

  if(
    rsi>=52 &&
    rsi<=68
  )
    bull++;


  if(
    rsi<=48 &&
    rsi>=32
  )
    bear++;


  /* MACD */

  if(macd>0)
    bull++;


  if(macd<0)
    bear++;


  /* CANDLE */

  if(last.close>last.open)
    bull++;


  if(last.close<last.open)
    bear++;


  /* STRUCTURE */

  const range =
  resistance-support;


  if(range>0){

    const fromSupport =
    (last.close-support)/range;


    const fromResistance =
    (resistance-last.close)/range;


    if(fromSupport<0.20)
      bull++;


    if(fromResistance<0.20)
      bear++;

  }


  let signal =
  "NO SIGNAL";


  let confidence=0;


  /*
    STRICT FILTER

    Weak/mixed conditions are rejected.
  */

  if(
    bull>=6 &&
    bull>=bear+2
  ){

    signal="CALL";

    confidence=
      Math.min(
        95,
        72 + ((bull-bear)*5)
      );

  }


  else if(
    bear>=6 &&
    bear>=bull+2
  ){

    signal="PUT";

    confidence=
      Math.min(
        95,
        72 + ((bear-bull)*5)
      );

  }


  return{

    signal,

    confidence,

    bull,

    bear,

    rsi,

    macd,

    ema9,

    ema21,

    ema50,

    support,

    resistance

  };

}


/* =========================================
   START SCAN
========================================= */

async function startScan(){

  if(scanning)
    return;


  scanning=true;


  const signal =
  document.getElementById("signal");


  const confidence =
  document.getElementById("confidence");


  const status =
  document.getElementById("status");


  const bar =
  document.getElementById("bar");


  const log =
  document.getElementById("log");


  const button =
  document.getElementById("scanButton");


  orb.classList.add("scanning");


  status.textContent="SCANNING";


  signal.className="signal wait";

  signal.textContent=
    "ANALYZING";


  confidence.textContent=
    "Collecting candle data...";


  log.textContent=
    "Step 1/5 — Market data";


  bar.style.width="15%";


  try{

    await wait(350);


    const data =
    await getCandles();


    bar.style.width="35%";


    log.textContent=
      "Step 2/5 — Trend analysis";


    await wait(350);


    bar.style.width="52%";


    log.textContent=
      "Step 3/5 — Momentum / RSI / MACD";


    await wait(350);


    bar.style.width="70%";


    log.textContent=
      "Step 4/5 — Price structure";


    const result =
    analyze(data);


    await wait(500);


    bar.style.width="100%";


    log.textContent=
      "Step 5/5 — Final confirmation";


    await wait(300);


    showResult(result);


    status.textContent="READY";

  }

  catch(error){

    signal.className=
      "signal none";


    signal.textContent=
      "NO SIGNAL";


    confidence.textContent=
      error.message;


    log.textContent=
      "Analysis stopped. No directional signal generated.";


    bar.style.width="0%";


    status.textContent="ERROR";

  }


  orb.classList.remove("scanning");

  scanning=false;

}


/* =========================================
   SHOW RESULT
========================================= */

function showResult(r){

  const signal =
  document.getElementById("signal");


  const confidence =
  document.getElementById("confidence");


  document.getElementById("trend")
  .textContent =
    r.ema9>r.ema21 &&
    r.ema21>r.ema50
    ? "BULLISH"
    :
    r.ema9<r.ema21 &&
    r.ema21<r.ema50
    ? "BEARISH"
    :
    "MIXED";


  document.getElementById("momentum")
  .textContent =
    r.bull>r.bear
    ? "BULLISH"
    :
    r.bear>r.bull
    ? "BEARISH"
    :
    "MIXED";


  document.getElementById("ema")
  .textContent =
    r.ema9.toFixed(5);


  document.getElementById("rsi")
  .textContent =
    r.rsi.toFixed(1);


  document.getElementById("macd")
  .textContent =
    r.macd.toFixed(5);


  document.getElementById("structure")
  .textContent =
    r.bull>r.bear
    ? "BULLISH"
    :
    r.bear>r.bull
    ? "BEARISH"
    :
    "MIXED";


  if(r.signal==="CALL"){

    signal.className=
      "signal call";

    signal.textContent=
      "CALL";


    confidence.textContent=
      "Confirmation: "+
      r.confidence+"%";


    document.getElementById("log")
    .textContent=
      "Strong bullish confirmations aligned. " +
      "Signal generated only after the strict filter.";

  }


  else if(r.signal==="PUT"){

    signal.className=
      "signal put";

    signal.textContent=
      "PUT";


    confidence.textContent=
      "Confirmation: "+
      r.confidence+"%";


    document.getElementById("log")
    .textContent=
      "Strong bearish confirmations aligned. " +
      "Signal generated only after the strict filter.";

  }


  else{

    signal.className=
      "signal none";

    signal.textContent=
      "NO SIGNAL";


    confidence.textContent=
      "Confirmation threshold not reached";


    document.getElementById("log")
    .textContent=
      "Market conditions are mixed or weak. " +
      "The scanner rejected the setup.";

  }

}


/* =========================================
   WAIT
========================================= */

function wait(ms){

  return new Promise(
    resolve=>setTimeout(resolve,ms)
  );

}


/* =========================================
   DRAG FLOATING BUTTON
========================================= */

let dragging=false;
let moved=false;

let startX=0;
let startY=0;

let startRight=18;
let startBottom=90;


orb.addEventListener(
  "pointerdown",
  e=>{

    dragging=true;
    moved=false;

    orb.setPointerCapture(e.pointerId);

    startX=e.clientX;
    startY=e.clientY;

    const rect=
      orb.getBoundingClientRect();


    startRight=
      window.innerWidth-
      rect.right;


    startBottom=
      window.innerHeight-
      rect.bottom;

  }
);


orb.addEventListener(
  "pointermove",
  e=>{

    if(!dragging)
      return;


    const dx=
      e.clientX-startX;


    const dy=
      e.clientY-startY;


    if(
      Math.abs(dx)>5 ||
      Math.abs(dy)>5
    )
      moved=true;


    let right=
      startRight-dx;


    let bottom=
      startBottom-dy;


    right=
      Math.max(
        5,
        Math.min(
          window.innerWidth-69,
          right
        )
      );


    bottom=
      Math.max(
        5,
        Math.min(
          window.innerHeight-69,
          bottom
        )
      );


    orb.style.right=
      right+"px";


    orb.style.bottom=
      bottom+"px";

  }
);


orb.addEventListener(
  "pointerup",
  ()=>{

    dragging=false;

    /*
      If the user dragged the orb,
      don't open the board.
    */

    if(moved)
      return;

    board.classList.toggle("open");

  }
);

</script>

</body>
</html>
