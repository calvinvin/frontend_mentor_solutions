(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[357],{486:(e,t,a)=>{Promise.resolve().then(a.bind(a,2077))},4322:(e,t,a)=>{"use strict";function r(e){return"string"==typeof e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}function s(e,t){return t.map(e=>e.name).includes(e)}function n(e){return"string"!=typeof e?"":e.split(" ").map(e=>r(e)).join(" ")}function m(e,t){return t.map(e=>e.name).includes(e)}function c(e,t){return t.map(e=>e.name).includes(e)}a.d(t,{IS:()=>m,IW:()=>c,ZS:()=>s,c:()=>r,uX:()=>n})},210:(e,t,a)=>{"use strict";var r=a(4374);a.o(r,"useSearchParams")&&a.d(t,{useSearchParams:function(){return r.useSearchParams}})},2077:(e,t,a)=>{"use strict";a.d(t,{default:()=>u});var r=a(1047),s=a(3217),n=a(8001),m=a.n(n),c=a(8147),i=a.n(c),x=a(3948),l=a.n(x),o=a(210),p=a(4322);function f(e){let{currentPlanet:t,dataDestinations:a}=e,s=a.map(e=>e.name);return(0,r.jsx)("nav",{className:"mb-[2.5rem] max-[960px]:w-fit max-[960px]:mx-auto max-[960px]:mb-[1.5rem]",children:(0,r.jsx)("ul",{className:"flex gap-[11px]",children:s.map(e=>(0,r.jsx)("li",{children:(0,r.jsx)(m(),{href:"/destination?planet=".concat(e),className:"".concat(i().className," tracking-[2px] \n                        pb-[8px] relative\n                        max-[560px]:text-[0.875rem]\n                        ").concat(e===t?"text-figma-white \n                            after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:border-b-[3px] after:border-b-figma-white":"text-figma-blue-300\n                            after:absolute after:content-[''] after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-figma-white/50\n                            hover:after:scale-x-100 after:transition-[scale] after:duration-200","\n                        "),children:e})},e))})})}function u(e){let{dataDestinations:t}=e,a=(0,o.useSearchParams)(),n=(0,p.c)(a.get("planet")),m=(0,p.ZS)(n,t)?n:"Moon";console.log(m);let{name:c,images:x,description:u,distance:d,travel:b}=t.filter(e=>e.name===m)[0];return(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-[2rem] items-center\n            max-[960px]:grid-cols-none max-[960px]:text-center max-[960px]:justify-items-center\n        ",children:[(0,r.jsx)(s.default,{src:"/frontend_mentor_5-5_space-tourism-website-main"+x.png.substring(1),width:445,height:445,alt:"",className:"w-[30rem] aspect-square max-[960px]:w-[18.75rem] max-[960px]:self-center max-[960px]:my-[42px] max-[560px]:w-[9.375rem]"}),(0,r.jsxs)("div",{className:"px-[47px]",children:[(0,r.jsx)(f,{dataDestinations:t,currentPlanet:m}),(0,r.jsx)("h1",{className:"".concat(l().className," text-[6rem] text-figma-white uppercase mb-[1rem] leading-[1]\n                max-[960px]:text-[5rem]\n                max-[560px]:text-[3.5rem]\n                "),children:c}),(0,r.jsx)("p",{className:"text-[1.125rem] text-figma-blue-300 tracking-[1.8] pb-[1rem] border-b-[1px] border-b-figma-white/25 mb-[1rem] max-[960px]:pb-[1.5rem] max-[960px]:mb-[1.5rem] max-[960px]:text-[1rem] max-[560px]:text-[0.9375rem]",children:u}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-[1.5rem] max-[560px]:grid-cols-none",children:[(0,r.jsxs)("p",{className:"".concat(i().className," text-[0.875rem] tracking-[2px] text-figma-blue-300 uppercase"),children:["avg. distance",(0,r.jsx)("strong",{className:"block mt-[0.75rem] ".concat(l().className," text-[1.75rem] text-figma-white"),children:d})]}),(0,r.jsxs)("p",{className:"".concat(i().className," text-[0.875rem] tracking-[2px] text-figma-blue-300 uppercase"),children:["est. travel time",(0,r.jsx)("strong",{className:"block mt-[0.75rem] ".concat(l().className," text-[1.75rem] text-figma-white"),children:b})]})]})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[674,253,268,635,721,59,358],()=>t(486)),_N_E=e.O()}]);