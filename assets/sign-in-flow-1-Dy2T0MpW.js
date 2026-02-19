import{j as t,c as m,L as _,M as d,r as f,C as v,a as p,b as x,V as y,d as c,S as h,O as g,e as j,f as z,G as w}from"./index-UFpB_eW8.js";const b="mesh",C="planeGeometry",M="primitive",P=()=>t.jsxs("div",{className:"absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50",children:[t.jsxs(_,{to:"/",className:"flex items-center gap-2",children:[t.jsx(d,{className:"w-10 h-10"}),t.jsx("span",{className:"text-xl font-bold text-white tracking-tight",children:"Morado"})]}),t.jsx(_,{to:"/",className:"text-white/60 hover:text-white transition-colors text-sm font-medium",children:"Back to home"})]}),$=({animationSpeed:e=10,opacities:i=[.3,.3,.3,.5,.5,.5,.8,.8,.8,1],colors:o=[[0,255,255]],containerClassName:n,dotSize:u,showGradient:a=!0,reverse:s=!1})=>t.jsxs("div",{className:m("h-full relative w-full",n),children:[t.jsx("div",{className:"h-full w-full",children:t.jsx(N,{colors:o??[[0,255,255]],dotSize:u??3,opacities:i??[.3,.3,.3,.5,.5,.5,.8,.8,.8,1],shader:`
            ${s?"u_reverse_active":"false"}_;
            animation_speed_factor_${e.toFixed(1)}_;
          `,center:["x","y"]})}),a&&t.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black to-transparent"})]}),N=({colors:e=[[0,0,0]],opacities:i=[.04,.04,.04,.04,.04,.08,.08,.08,.08,.14],totalSize:o=20,dotSize:n=2,shader:u="",center:a=["x","y"]})=>{const s=f.useMemo(()=>{let r=[e[0],e[0],e[0],e[0],e[0],e[0]];return e.length===2?r=[e[0],e[0],e[0],e[1],e[1],e[1]]:e.length===3&&(r=[e[0],e[0],e[1],e[1],e[2],e[2]]),{u_colors:{value:r.map(l=>[l[0]/255,l[1]/255,l[2]/255]),type:"uniform3fv"},u_opacities:{value:i,type:"uniform1fv"},u_total_size:{value:o,type:"uniform1f"},u_dot_size:{value:n,type:"uniform1f"},u_reverse:{value:u.includes("u_reverse_active")?1:0,type:"uniform1i"}}},[e,i,o,n,u]);return t.jsx(k,{source:`
        precision mediump float;
        in vec2 fragCoord;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform int u_reverse; 
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) { return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x); }
        void main() {
            vec2 st = fragCoord.xy;
            ${a.includes("x")?"st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));":""}
            ${a.includes("y")?"st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));":""}
            float opacity = step(0.0, st.x) * step(0.0, st.y);
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            float frequency = 5.0;
            float show_offset = random(st2); 
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
            vec3 color = u_colors[int(show_offset * 6.0)];
            float animation_speed_factor = 0.5; 
            vec2 center_grid = u_resolution / 2.0 / u_total_size;
            float dist_from_center = distance(center_grid, st2);
            float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);
            float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
            float timing_offset_outro = (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);
            if (u_reverse == 1) {
                 opacity *= 1.0 - step(timing_offset_outro, u_time * animation_speed_factor);
            } else {
                 opacity *= step(timing_offset_intro, u_time * animation_speed_factor);
            }
            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a; 
        }`,uniforms:s})},S=({source:e,uniforms:i})=>{const{size:o}=p(),n=f.useRef(null);x(({clock:a})=>{if(!n.current)return;const s=n.current.material;s.uniforms.u_time.value=a.getElapsedTime()});const u=f.useMemo(()=>{const a={u_time:{value:0},u_resolution:{value:new y(o.width*2,o.height*2)}};for(const s in i){const r=i[s];r.type==="uniform3fv"?a[s]={value:r.value.map(l=>new c().fromArray(l))}:r.type==="uniform3f"?a[s]={value:new c().fromArray(r.value)}:a[s]={value:r.value}}return new h({vertexShader:`
      precision mediump float;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        gl_Position = vec4(position.x, position.y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }`,fragmentShader:e,uniforms:a,glslVersion:w,blending:z,blendSrc:j,blendDst:g})},[o.width,o.height,e,i]);return t.jsxs(b,{ref:n,children:[t.jsx(C,{args:[2,2]}),t.jsx(M,{object:u,attach:"material"})]})},k=({source:e,uniforms:i})=>t.jsx(v,{className:"absolute inset-0 h-full w-full",children:t.jsx(S,{source:e,uniforms:i})});export{$ as C,P as M};
