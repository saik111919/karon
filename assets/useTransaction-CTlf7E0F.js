import{P as r,j as c,r as o,e as u,f as l}from"./index-ytbsYa1s.js";const p=({children:s,className:e="bg-inherit rounded-lg shadow-sm w-full shadow-current"})=>c.jsx("div",{className:e,children:s});p.propTypes={children:r.node.isRequired,className:r.string};const f=({children:s,className:e="text-current"})=>c.jsx("div",{className:e,children:s});f.propTypes={children:r.node.isRequired,className:r.string};const h=({children:s,className:e="bg-inherit rounded-t-xl "})=>c.jsx("div",{className:e,children:s});h.propTypes={children:r.node.isRequired,className:r.string};const m=()=>{const[s,e]=o.useState([]),[a,d]=u(!1),t=o.useCallback(async()=>{a(!0);try{const n=await l(),{data:i}=n;e(i)}catch(n){console.error("Failed to fetch transactions:",n)}finally{a(!1)}},[a]);return o.useEffect(()=>{t()},[t]),{data:s,LoaderComp:d,setLoader:a,fetchTransactions:t}};export{p as C,f as a,h as b,m as u};
