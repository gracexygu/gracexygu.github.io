var it=Object.defineProperty;var ot=(F,R,P)=>R in F?it(F,R,{enumerable:!0,configurable:!0,writable:!0,value:P}):F[R]=P;var _=(F,R,P)=>ot(F,typeof R!="symbol"?R+"":R,P);import{r as K,j as le}from"./index-ByfgJ2rJ.js";function st({SIM_RESOLUTION:F=128,DYE_RESOLUTION:R=1440,CAPTURE_RESOLUTION:P=512,DENSITY_DISSIPATION:ve=3.5,VELOCITY_DISSIPATION:me=2,PRESSURE:de=.1,PRESSURE_ITERATIONS:he=20,CURL:xe=3,SPLAT_RADIUS:Te=.2,SPLAT_FORCE:ge=6e3,SHADING:Re=!0,COLOR_UPDATE_SPEED:pe=10,BACK_COLOR:nt={r:0,g:.02,b:.06},TRANSPARENT:at=!0,RAINBOW_MODE:Ee=!1,COLOR:Se="#002FA7"}){const N=K.useRef(null),B=K.useRef(null);return K.useEffect(()=>{if(!N.current)return;const s=N.current;let j=!0;function De(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}const l={SIM_RESOLUTION:F,DYE_RESOLUTION:R,DENSITY_DISSIPATION:ve,VELOCITY_DISSIPATION:me,PRESSURE:de,PRESSURE_ITERATIONS:he,CURL:xe,SPLAT_RADIUS:Te,SPLAT_FORCE:ge,SHADING:Re,COLOR_UPDATE_SPEED:pe,RAINBOW_MODE:Ee,COLOR:Se},w=[new De],{gl:t,ext:p}=ye(s);p.supportLinearFiltering||(l.DYE_RESOLUTION=256,l.SHADING=!1);function ye(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",r);const o=!!i;o||(i=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let n,a;o?(i.getExtension("EXT_color_buffer_float"),a=i.getExtension("OES_texture_float_linear")):(n=i.getExtension("OES_texture_half_float"),a=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);const u=o?i.HALF_FLOAT:n&&n.HALF_FLOAT_OES;let v,f,S;return o?(v=D(i,i.RGBA16F,i.RGBA,u),f=D(i,i.RG16F,i.RG,u),S=D(i,i.R16F,i.RED,u)):(v=D(i,i.RGBA,i.RGBA,u),f=D(i,i.RGBA,i.RGBA,u),S=D(i,i.RGBA,i.RGBA,u)),{gl:i,ext:{formatRGBA:v,formatRG:f,formatR:S,halfFloatTexType:u,supportLinearFiltering:a}}}function D(e,r,i,o){if(!Ae(e,r,i,o))switch(r){case e.R16F:return D(e,e.RG16F,e.RG,o);case e.RG16F:return D(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:r,format:i}}function Ae(e,r,i,o){const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,i,o,null);const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE}class _e{constructor(r,i){_(this,"vertexShader");_(this,"fragmentShaderSource");_(this,"programs");_(this,"activeProgram");_(this,"uniforms");this.vertexShader=r,this.fragmentShaderSource=i,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let i=0;for(let n=0;n<r.length;n++)i+=rt(r[n]);let o=this.programs[i];if(o==null){const n=h(t.FRAGMENT_SHADER,this.fragmentShaderSource,r);o=q(this.vertexShader,n),this.programs[i]=o}o!==this.activeProgram&&(this.uniforms=J(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class E{constructor(r,i){_(this,"uniforms");_(this,"program");this.uniforms={},this.program=q(r,i),this.uniforms=J(this.program)}bind(){t.useProgram(this.program)}}function q(e,r){const i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(i)),i}function J(e){const r=[],i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){const n=t.getActiveUniform(e,o).name;r[n]=t.getUniformLocation(e,n)}return r}function h(e,r,i){r=Fe(r,i);const o=t.createShader(e);return t.shaderSource(o,r),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function Fe(e,r){if(!r)return e;let i="";return r.forEach(o=>{i+="#define "+o+`
`}),i+e}const T=h(t.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),we=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),be=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `),Ue=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;
      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;
              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);
              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);
              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,Le=h(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),Pe=h(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,p.supportLinearFiltering?void 0:["MANUAL_FILTERING"]),Be=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),Xe=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),Ce=h(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),ze=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),Me=h(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),d=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),r&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let m,c,O,G,y;const Q=new E(T,we),Y=new E(T,be),A=new E(T,Le),x=new E(T,Pe),V=new E(T,Be),H=new E(T,Xe),b=new E(T,Ce),X=new E(T,ze),C=new E(T,Me),z=new _e(T,Ue);function Z(){const e=oe(l.SIM_RESOLUTION),r=oe(l.DYE_RESOLUTION),i=p.halfFloatTexType,o=p.formatRGBA,n=p.formatRG,a=p.formatR,u=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),m?m=$(m,r.width,r.height,o.internalFormat,o.format,i,u):m=W(r.width,r.height,o.internalFormat,o.format,i,u),c?c=$(c,e.width,e.height,n.internalFormat,n.format,i,u):c=W(e.width,e.height,n.internalFormat,n.format,i,u),O=U(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),G=U(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST),y=W(e.width,e.height,a.internalFormat,a.format,i,t.NEAREST)}function U(e,r,i,o,n,a){t.activeTexture(t.TEXTURE0);const u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,r,0,o,n,null);const v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);const f=1/e,S=1/r;return{texture:u,fbo:v,width:e,height:r,texelSizeX:f,texelSizeY:S,attach(L){return t.activeTexture(t.TEXTURE0+L),t.bindTexture(t.TEXTURE_2D,u),L}}}function W(e,r,i,o,n,a){let u=U(e,r,i,o,n,a),v=U(e,r,i,o,n,a);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(f){u=f},get write(){return v},set write(f){v=f},swap(){const f=u;u=v,v=f}}}function Ie(e,r,i,o,n,a,u){const v=U(r,i,o,n,a,u);return Q.bind(),t.uniform1i(Q.uniforms.uTexture,e.attach(0)),d(v),v}function $(e,r,i,o,n,a,u){return e.width===r&&e.height===i||(e.read=Ie(e.read,r,i,o,n,a,u),e.write=U(r,i,o,n,a,u),e.width=r,e.height=i,e.texelSizeX=1/r,e.texelSizeY=1/i),e}function Ne(){const e=[];l.SHADING&&e.push("SHADING"),z.setKeywords(e)}Ne(),Z();let ee=Date.now(),M=0;function te(){if(!j)return;const e=Oe();Ge()&&Z(),Ye(e),Ve(),He(e),We(null),B.current=requestAnimationFrame(te)}function Oe(){const e=Date.now();let r=(e-ee)/1e3;return r=Math.min(r,.016666),ee=e,r}function Ge(){const e=g(s.clientWidth),r=g(s.clientHeight);return s.width!==e||s.height!==r?(s.width=e,s.height=r,!0):!1}function Ye(e){M+=e*l.COLOR_UPDATE_SPEED,M>=1&&(M=tt(M,0,1),w.forEach(r=>{r.color=I()}))}function Ve(){w.forEach(e=>{e.moved&&(e.moved=!1,Ke(e))})}function He(e){t.disable(t.BLEND),H.bind(),t.uniform2f(H.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(H.uniforms.uVelocity,c.read.attach(0)),d(G),b.bind(),t.uniform2f(b.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(b.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(b.uniforms.uCurl,G.attach(1)),t.uniform1f(b.uniforms.curl,l.CURL),t.uniform1f(b.uniforms.dt,e),d(c.write),c.swap(),V.bind(),t.uniform2f(V.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(V.uniforms.uVelocity,c.read.attach(0)),d(O),Y.bind(),t.uniform1i(Y.uniforms.uTexture,y.read.attach(0)),t.uniform1f(Y.uniforms.value,l.PRESSURE),d(y.write),y.swap(),X.bind(),t.uniform2f(X.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(X.uniforms.uDivergence,O.attach(0));for(let i=0;i<l.PRESSURE_ITERATIONS;i++)t.uniform1i(X.uniforms.uPressure,y.read.attach(1)),d(y.write),y.swap();C.bind(),t.uniform2f(C.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(C.uniforms.uPressure,y.read.attach(0)),t.uniform1i(C.uniforms.uVelocity,c.read.attach(1)),d(c.write),c.swap(),x.bind(),t.uniform2f(x.uniforms.texelSize,c.texelSizeX,c.texelSizeY),p.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);const r=c.read.attach(0);t.uniform1i(x.uniforms.uVelocity,r),t.uniform1i(x.uniforms.uSource,r),t.uniform1f(x.uniforms.dt,e),t.uniform1f(x.uniforms.dissipation,l.VELOCITY_DISSIPATION),d(c.write),c.swap(),p.supportLinearFiltering||t.uniform2f(x.uniforms.dyeTexelSize,m.texelSizeX,m.texelSizeY),t.uniform1i(x.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(x.uniforms.uSource,m.read.attach(1)),t.uniform1f(x.uniforms.dissipation,l.DENSITY_DISSIPATION),d(m.write),m.swap()}function We(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),ke(e)}function ke(e){const r=t.drawingBufferWidth,i=t.drawingBufferHeight;z.bind(),l.SHADING&&t.uniform2f(z.uniforms.texelSize,1/r,1/i),t.uniform1i(z.uniforms.uTexture,m.read.attach(0)),d(e)}function Ke(e){const r=e.deltaX*l.SPLAT_FORCE,i=e.deltaY*l.SPLAT_FORCE;re(e.texcoordX,e.texcoordY,r,i,e.color)}function je(e){const r=I();r.r*=10,r.g*=10,r.b*=10;const i=10*(Math.random()-.5),o=30*(Math.random()-.5);re(e.texcoordX,e.texcoordY,i,o,r)}function re(e,r,i,o,n){A.bind(),t.uniform1i(A.uniforms.uTarget,c.read.attach(0)),t.uniform1f(A.uniforms.aspectRatio,s.width/s.height),t.uniform2f(A.uniforms.point,e,r),t.uniform3f(A.uniforms.color,i,o,0),t.uniform1f(A.uniforms.radius,qe(l.SPLAT_RADIUS/100)),d(c.write),c.swap(),t.uniform1i(A.uniforms.uTarget,m.read.attach(0)),t.uniform3f(A.uniforms.color,n.r,n.g,n.b),d(m.write),m.swap()}function qe(e){const r=s.width/s.height;return r>1&&(e*=r),e}function ie(e,r,i,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=i/s.width,e.texcoordY=1-o/s.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=I()}function k(e,r,i,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/s.width,e.texcoordY=1-i/s.height,e.deltaX=Qe(e.texcoordX-e.prevTexcoordX),e.deltaY=Ze(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function Je(e){e.down=!1}function Qe(e){const r=s.width/s.height;return r<1&&(e*=r),e}function Ze(e){const r=s.width/s.height;return r>1&&(e/=r),e}function $e(e){let r=e.replace("#","");r.length===3&&(r=r[0]+r[0]+r[1]+r[1]+r[2]+r[2]);const i=parseInt(r.slice(0,2),16)/255,o=parseInt(r.slice(2,4),16)/255,n=parseInt(r.slice(4,6),16)/255;return{r:i*.15,g:o*.15,b:n*.15}}function I(){if(!l.RAINBOW_MODE)return $e(l.COLOR);const e=et(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function et(e,r,i){let o=0,n=0,a=0;const u=Math.floor(e*6),v=e*6-u,f=i*(1-r),S=i*(1-v*r),L=i*(1-(1-v)*r);switch(u%6){case 0:o=i,n=L,a=f;break;case 1:o=S,n=i,a=f;break;case 2:o=f,n=i,a=L;break;case 3:o=f,n=S,a=i;break;case 4:o=L,n=f,a=i;break;case 5:o=i,n=f,a=S;break}return{r:o,g:n,b:a}}function tt(e,r,i){const o=i-r;return(e-r)%o+r}function oe(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);const i=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:i}:{width:i,height:o}}function g(e){const r=window.devicePixelRatio||1;return Math.floor(e*r)}function rt(e){if(e.length===0)return 0;let r=0;for(let i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r|=0;return r}function ne(e){const r=w[0],i=g(e.clientX),o=g(e.clientY);ie(r,-1,i,o),je(r)}let ae=!1;function ce(e){const r=w[0],i=g(e.clientX),o=g(e.clientY);if(ae)k(r,i,o,r.color);else{const n=I();k(r,i,o,n),ae=!0}}function ue(e){const r=e.targetTouches,i=w[0];for(let o=0;o<r.length;o++){const n=g(r[o].clientX),a=g(r[o].clientY);ie(i,r[o].identifier,n,a)}}function se(e){const r=e.targetTouches,i=w[0];for(let o=0;o<r.length;o++){const n=g(r[o].clientX),a=g(r[o].clientY);k(i,n,a,i.color)}}function fe(e){const r=e.changedTouches,i=w[0];for(let o=0;o<r.length;o++)Je(i)}return window.addEventListener("mousedown",ne),window.addEventListener("mousemove",ce),window.addEventListener("touchstart",ue),window.addEventListener("touchmove",se,!1),window.addEventListener("touchend",fe),te(),()=>{j=!1,B.current&&(cancelAnimationFrame(B.current),B.current=null),window.removeEventListener("mousedown",ne),window.removeEventListener("mousemove",ce),window.removeEventListener("touchstart",ue),window.removeEventListener("touchmove",se),window.removeEventListener("touchend",fe)}},[]),le.jsx("div",{style:{position:"fixed",top:0,left:0,zIndex:1,pointerEvents:"none",width:"100%",height:"100%"},children:le.jsx("canvas",{ref:N,style:{width:"100vw",height:"100vh",display:"block"}})})}export{st as SplashCursor,st as default};
