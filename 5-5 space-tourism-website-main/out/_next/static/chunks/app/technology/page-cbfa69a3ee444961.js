(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[669],{5031:(e,t,a)=>{Promise.resolve().then(a.bind(a,8236))},4322:(e,t,a)=>{"use strict";function r(e){return"string"==typeof e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}function n(e,t){return t.map(e=>e.name).includes(e)}function s(e){return"string"!=typeof e?"":e.split(" ").map(e=>r(e)).join(" ")}function c(e,t){return t.map(e=>e.name).includes(e)}function m(e,t){return t.map(e=>e.name).includes(e)}a.d(t,{IS:()=>c,IW:()=>m,ZS:()=>n,c:()=>r,uX:()=>s})},210:(e,t,a)=>{"use strict";var r=a(4374);a.o(r,"useSearchParams")&&a.d(t,{useSearchParams:function(){return r.useSearchParams}})},8236:(e,t,a)=>{"use strict";a.d(t,{default:()=>o});var r=a(1047),n=a(210),s=a(8001),c=a.n(s),m=a(4322),x=a(3948),i=a.n(x);function l(e){let{currentTechnology:t,dataTechnology:a}=e,n=a.map(e=>e.name);return(0,r.jsx)("nav",{children:(0,r.jsx)("ul",{className:"flex flex-col gap-[2rem] max-[960px]:flex-row",children:n.map((e,a)=>{let n=new URLSearchParams;return n.set("technology",e),(0,r.jsx)("li",{children:(0,r.jsx)(c(),{href:"/technology?".concat(n.toString()),className:"".concat(i().className," w-[5rem] aspect-square rounded-[50%] border-[1px] border-figma-white/[.25] text-[2rem] grid place-content-center\n                            ").concat(e===t?"bg-figma-white text-figma-blue-900":"text-figma-white hover:border-figma-white transition-[border-color] duration-200","\n                            max-[960px]:w-[3.5rem] max-[960px]:text-[1.5rem]\n                            max-[560px]:w-[2.5rem] max-[560px]:text-[1.125rem]\n                            "),children:a+1})},e)})})})}function o(e){let{dataTechnology:t}=e,a=(0,n.useSearchParams)(),s=(0,m.c)(a.get("technology")),c=(0,m.IW)(s,t)?s:"Launch vehicle",{name:x,images:o,description:p}=t.filter(e=>e.name===c)[0];return(0,r.jsxs)("div",{className:"grid grid-cols-2 items-center gap-[2rem] max-[960px]:grid-cols-none  max-[960px]:pt-[64px] ",children:[(0,r.jsxs)("div",{className:"grid grid-cols-[auto_1fr] gap-[64px] max-[960px]:grid-cols-none max-[960px]:justify-items-center max-[960px]:text-center max-[960px]:px-[24px] max-[960px]:gap-[40px] ",children:[(0,r.jsx)(l,{currentTechnology:c,dataTechnology:t}),(0,r.jsxs)("div",{className:"content-center",children:[(0,r.jsx)("p",{className:"".concat(i().className," mb-[1rem] text-[2rem] uppercase text-figma-white/50\n                    max-[960px]:text-[1.5rem]\n                    max-[560px]:text-[1.125rem]"),children:"the terminology..."}),(0,r.jsx)("h1",{className:"".concat(i().className," mb-[1.5rem] text-[3.5rem] uppercase text-figma-white\n                    max-[960px]:text-[2.5rem] max-[960px]:mb-[1rem]\n                    max-[560px]:text-[1.5rem]\n                    "),children:x}),(0,r.jsx)("p",{className:" text-[1.125rem] tracking-[1.8] text-figma-blue-300 max-[960px]:text-[1rem] max-[560px]:text-[0.9375rem] ",children:p})]})]}),(0,r.jsxs)("picture",{className:"max-[960px]:order-first ",children:[(0,r.jsx)("source",{srcSet:o.landscape,media:"(max-width: 960px)"}),(0,r.jsx)("img",{src:o.portrait.substring(1),alt:"",className:"block w-full h-full max-h-[600px] min-h-[258px] object-cover max-[960px]:h-auto"})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[253,268,721,59,358],()=>t(5031)),_N_E=e.O()}]);