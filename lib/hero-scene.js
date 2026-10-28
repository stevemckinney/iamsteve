import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

// Colours come straight from the illustration tokens, so skip three’s colour conversion
THREE.ColorManagement.enabled = false

const V = (x, y, z) => new THREE.Vector3(x, y, z)

// Extrusion depth in SVG px for the flat illustrations
const DEPTH = {
  sharpener: 32,
  sticky: 8,
  'ruler-mono': 12,
  star: 14,
  figma: 12,
  component: 14,
  safari: 14,
  terminal: 18,
  pen: 8,
}
const ICON_DEPTH = 6
const TEXTURE_SCALE = 4
const MAX_TILT = 0.4

const TOKENS = [
  'foreground',
  'surface',
  'surface-100',
  'surface-150',
  'lowlight',
  'subtle',
  'muted',
  'border',
]

// ---------- colours ----------

function readColours(section) {
  const probe = document.createElement('span')
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  section.append(probe)
  const ctx = document.createElement('canvas').getContext('2d', {
    willReadFrequently: true,
  })
  const read = (name) => {
    probe.style.color = `var(${name})`
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = getComputedStyle(probe).color
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return V(r / 255, g / 255, b / 255)
  }
  const colours = Object.fromEntries(
    TOKENS.map((t) => [t, read(`--fill-${t}`)])
  )
  colours.line = read('--stroke-border')
  colours['rubber-mid'] = colours.lowlight.clone().lerp(colours.border, 0.4)
  colours['rubber-dark'] = colours.lowlight.clone().lerp(colours.border, 0.5)
  probe.remove()
  return colours
}

// ---------- materials ----------

const toonVert = `
  varying vec3 vN;
  void main() {
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`
const toonFrag = `
  uniform int uMode;
  uniform vec3 uC0, uC1, uC2, uLight;
  uniform float uT1, uT2;
  varying vec3 vN;
  void main() {
    vec3 n = normalize(vN);
    vec3 c = uC0;
    if (uMode == 1) {          // facets: base, mid, dark by direction
      float d = dot(n, normalize(uLight));
      c = d < uT1 ? uC2 : (d < uT2 ? uC1 : uC0);
    } else if (uMode == 2) {   // cone: darker towards the silhouette
      float f = 1.0 - abs(n.z);
      c = f < uT1 ? uC0 : uC1;
    }
    gl_FragColor = vec4(c, 1.0);
  }`

function toon(mode, c0, c1 = c0, c2 = c0, t1 = 0, t2 = 0, light = [0, 0, 1]) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uMode: { value: mode },
      uC0: { value: c0 },
      uC1: { value: c1 },
      uC2: { value: c2 },
      uT1: { value: t1 },
      uT2: { value: t2 },
      uLight: { value: V(...light) },
    },
    vertexShader: toonVert,
    fragmentShader: toonFrag,
  })
}
const flat = (c) => toon(0, c)

function idMaterial(id) {
  return new THREE.ShaderMaterial({
    uniforms: { uId: { value: id } },
    vertexShader: `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float uId; void main() { gl_FragColor = vec4(uId / 255.0, 0.0, 0.0, 1.0); }`,
  })
}

// ---------- geometry ----------

function makeGeometry(verts, tris, ref) {
  const index = []
  const e1 = V(0, 0, 0)
  const e2 = V(0, 0, 0)
  const n = V(0, 0, 0)
  const c = V(0, 0, 0)
  for (const [a, b, d] of tris) {
    e1.subVectors(verts[b], verts[a])
    e2.subVectors(verts[d], verts[a])
    n.crossVectors(e1, e2)
    c.copy(verts[a])
      .add(verts[b])
      .add(verts[d])
      .multiplyScalar(1 / 3)
    if (n.dot(ref(c)) < 0) index.push(a, d, b)
    else index.push(a, b, d)
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(verts)
  geometry.setIndex(index)
  geometry.computeVertexNormals()
  return geometry
}

// Hexagonal pencil along axis A, measured in SVG px from the blunt end (u) to the tip.
// The last band ends where the sharpening cone cuts the hexagon, which gives the scalloped edge.
function hexPencil({ A, E1, E2, UC, R, end, bands, tip, highlight }) {
  const C = 2
  const NI = 10
  const P = (u, x, y, s = 1) =>
    A.clone()
      .multiplyScalar(u - UC)
      .addScaledVector(E1, x * s)
      .addScaledVector(E2, y * s)
  const corners = Array.from({ length: 6 }, (_, k) => {
    const a = (k * Math.PI) / 3
    return [R * Math.cos(a), R * Math.sin(a)]
  })
  const towards = (p, q, d) => {
    const dx = q[0] - p[0]
    const dy = q[1] - p[1]
    const l = Math.hypot(dx, dy)
    return [p[0] + (dx / l) * d, p[1] + (dy / l) * d]
  }
  const profile = []
  for (let k = 0; k < 6; k++) {
    const p = corners[k]
    const a = towards(p, corners[(k + 5) % 6], C)
    const b = towards(p, corners[(k + 1) % 6], C)
    const an = towards(corners[(k + 1) % 6], p, C)
    profile.push({ p: a, edge: true }, { p: b, edge: false })
    for (let i = 1; i <= NI; i++) {
      const t = i / (NI + 1)
      profile.push({
        p: [b[0] + (an[0] - b[0]) * t, b[1] + (an[1] - b[1]) * t],
        edge: false,
      })
    }
  }
  const NP = profile.length
  const rho = profile.map(({ p }) => Math.hypot(p[0], p[1]))
  const scallop = rho.map((r) => tip.apex - tip.k * r)

  const rings = []
  const names = []
  const STEPS = 8
  for (let s = 0; s <= STEPS; s++) {
    const t = ((Math.PI / 2) * s) / STEPS
    const u = end.u0 + end.r - end.r * Math.cos(t)
    const sc = (R - end.r + end.r * Math.sin(t)) / R
    rings.push(profile.map(({ p }) => P(u, p[0], p[1], sc)))
    if (s) names.push(bands[0].name)
  }
  bands.forEach((band, i) => {
    rings.push(
      profile.map(({ p }, j) =>
        P(i < bands.length - 1 ? band.to : scallop[j], p[0], p[1])
      )
    )
    names.push(band.name)
  })
  const WOOD = 8
  for (let i = 1; i <= WOOD; i++) {
    rings.push(
      profile.map(({ p }, j) => {
        const u = scallop[j] + ((tip.lead - scallop[j]) * i) / WOOD
        const r = (tip.apex - u) / tip.k
        return P(u, (p[0] / rho[j]) * r, (p[1] / rho[j]) * r)
      })
    )
    names.push('wood')
  }

  const buckets = {}
  const bucket = (n) =>
    buckets[n] || (buckets[n] = { verts: [], map: new Map(), tris: [] })
  const vertex = (b, key, v) => {
    if (!b.map.has(key)) {
      b.map.set(key, b.verts.length)
      b.verts.push(v)
    }
    return b.map.get(key)
  }
  const ring = (b, r, j) => vertex(b, `${r}_${j}`, rings[r][j])
  for (let r = 0; r < rings.length - 1; r++) {
    for (let j = 0; j < NP; j++) {
      const name =
        profile[j].edge && highlight.includes(names[r])
          ? `${names[r]}-highlight`
          : names[r]
      const b = bucket(name)
      const jn = (j + 1) % NP
      const a = ring(b, r, j)
      const c = ring(b, r + 1, jn)
      b.tris.push([a, ring(b, r, jn), c], [a, c, ring(b, r + 1, j)])
    }
  }
  const capBucket = bucket(bands[0].name)
  const cap = vertex(capBucket, 'cap', P(end.u0, 0, 0))
  for (let j = 0; j < NP; j++) {
    capBucket.tris.push([
      cap,
      ring(capBucket, 0, j),
      ring(capBucket, 0, (j + 1) % NP),
    ])
  }
  const leadBucket = bucket('lead')
  const last = rings.length - 1
  const point = vertex(leadBucket, 'tip', P(tip.apex, 0, 0))
  for (let j = 0; j < NP; j++) {
    leadBucket.tris.push([
      ring(leadBucket, last, j),
      ring(leadBucket, last, (j + 1) % NP),
      point,
    ])
  }

  const ref = (c) => {
    const ua = c.dot(A)
    const u = ua + UC
    const r = c.clone().addScaledVector(A, -ua)
    if (r.lengthSq() > 1e-9) r.normalize()
    if (u < end.u0 + end.r - 0.1) r.addScaledVector(A, -1)
    if (u > tip.lead - 0.1) r.addScaledVector(A, 0.3)
    return r
  }
  return Object.fromEntries(
    Object.entries(buckets).map(([n, b]) => [
      n,
      makeGeometry(b.verts, b.tris, ref),
    ])
  )
}

// ---------- models ----------

function pencil(colours) {
  const parts = hexPencil({
    A: V(1, -1, 0).normalize(),
    E1: V(1, 1, 0).normalize(),
    E2: V(0, 0, 1),
    UC: 96 / Math.SQRT2,
    R: 16,
    end: { u0: 17.4, r: 6 },
    bands: [{ to: 37.4, name: 'ferrule' }, { name: 'body' }],
    tip: { apex: 129.4, k: 2.5, lead: 119.4 },
    highlight: ['ferrule', 'body'],
  })
  const light = [0.276, 0.276, 0.921]
  return [
    [
      parts.ferrule,
      toon(
        1,
        colours['surface-150'],
        colours.lowlight,
        colours.lowlight,
        0.45,
        0.86,
        light
      ),
      0,
    ],
    [parts['ferrule-highlight'], flat(colours['surface-100']), 0],
    [
      parts.body,
      toon(
        1,
        colours.surface,
        colours['surface-150'],
        colours['surface-150'],
        0.45,
        0.86,
        light
      ),
      1,
    ],
    [parts['body-highlight'], flat(colours.foreground), 1],
    [
      parts.wood,
      toon(
        2,
        colours.foreground,
        colours['surface-100'],
        colours['surface-100'],
        0.29
      ),
      2,
    ],
    [parts.lead, flat(colours.subtle), 3],
  ]
}

function pencilMono(colours) {
  const parts = hexPencil({
    A: V(1, 0, 0),
    E1: V(0, 1, 0),
    E2: V(0, 0, 1),
    UC: 481,
    R: 22,
    end: { u0: 1, r: 4 },
    bands: [
      { to: 39, name: 'rubber' },
      { to: 51, name: 'ferrule' },
      { to: 55, name: 'groove' },
      { to: 59, name: 'ferrule' },
      { to: 63, name: 'groove' },
      { to: 110, name: 'ferrule' },
      { to: 114, name: 'groove' },
      { to: 118, name: 'ferrule' },
      { to: 122, name: 'groove' },
      { to: 135, name: 'ferrule' },
      { name: 'body' },
    ],
    tip: { apex: 961, k: 5, lead: 925 },
    highlight: ['ferrule', 'body'],
  })
  const light = [0, 0.3, 0.95]
  return [
    [
      parts.rubber,
      toon(
        1,
        colours.lowlight,
        colours['rubber-mid'],
        colours['rubber-dark'],
        0.45,
        0.86,
        light
      ),
      0,
    ],
    [
      parts.ferrule,
      toon(
        1,
        colours.surface,
        colours['surface-150'],
        colours['surface-150'],
        0.45,
        0.86,
        light
      ),
      1,
    ],
    [parts['ferrule-highlight'], flat(colours.foreground), 1],
    [parts.groove, flat(colours['surface-150']), 1],
    [
      parts.body,
      toon(
        1,
        colours.surface,
        colours['surface-150'],
        colours.lowlight,
        0.45,
        0.86,
        light
      ),
      2,
    ],
    [parts['body-highlight'], flat(colours.foreground), 2],
    [
      parts.wood,
      toon(
        2,
        colours.foreground,
        colours['surface-100'],
        colours['surface-100'],
        0.13
      ),
      3,
    ],
    [parts.lead, flat(colours.subtle), 4],
  ]
}

// The SVG with every token resolved, so it can be drawn as an image or parsed for shapes
function serialise(svg, { shapes = false } = {}) {
  const clone = svg.cloneNode(true)
  const source = [svg, ...svg.querySelectorAll('*')]
  const target = [clone, ...clone.querySelectorAll('*')]
  source.forEach((el, i) => {
    const cs = getComputedStyle(el)
    const out = target[i]
    out.removeAttribute('class')
    if (el === svg) return out.removeAttribute('style')
    if (shapes) {
      out.setAttribute(
        'style',
        `fill:${cs.fill === 'none' ? 'none' : '#000'};stroke:none`
      )
    } else {
      out.setAttribute(
        'style',
        `fill:${cs.fill};stroke:${cs.stroke};opacity:${cs.opacity}`
      )
    }
  })
  const { width, height } = svg.viewBox.baseVal
  const scale = shapes ? 1 : TEXTURE_SCALE
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', width * scale)
  clone.setAttribute('height', height * scale)
  return new XMLSerializer().serializeToString(clone)
}

async function paint(svg, texture) {
  const image = new Image()
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    serialise(svg)
  )}`
  await image.decode()
  const canvas = texture.image
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0)
  texture.image = canvas
  texture.needsUpdate = true
}

function extruded(svg, depth, colours) {
  const { width: w, height: h } = svg.viewBox.baseVal
  const data = new SVGLoader().parse(serialise(svg, { shapes: true }))
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p))
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: false,
    curveSegments: 16,
  })
  const pos = geometry.attributes.position
  const uv = geometry.attributes.uv
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / w, 1 - pos.getY(i) / h)
  }
  geometry.translate(-w / 2, -h / 2, 0)
  geometry.scale(1, -1, -1)
  geometry.translate(0, 0, depth / 2)

  const texture = new THREE.Texture(document.createElement('canvas'))
  texture.colorSpace = THREE.NoColorSpace
  texture.anisotropy = 4
  const face = new THREE.MeshBasicMaterial({ map: texture })
  const side = toon(
    1,
    colours.lowlight,
    colours.lowlight,
    colours.muted,
    0,
    0,
    [0.276, 0.276, 0.921]
  )
  return { geometry, materials: [face, side], texture }
}

// ---------- outline pass ----------
// Lines sit wherever the part under a pixel changes (silhouettes, part seams and
// one object crossing another), drawn with the illustrations’ border token.

const codec = `
  vec4 enc(vec2 s) { vec2 v = floor(s * 2.0 + 0.5); vec2 h = floor(v / 256.0); vec2 l = v - h * 256.0; return vec4(h.x, l.x, h.y, l.y) / 255.0; }
  vec2 dec(vec4 t) { vec4 b = floor(t * 255.0 + 0.5); return vec2(b.x * 256.0 + b.y, b.z * 256.0 + b.w) * 0.5; }
  bool isEmpty(vec4 t) { return t.r > 0.999 && t.g > 0.999; }`
const quadVert = `void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`

function outlinePass() {
  const seed = new THREE.ShaderMaterial({
    uniforms: { tId: { value: null }, uRes: { value: new THREE.Vector2() } },
    vertexShader: quadVert,
    fragmentShader: `${codec}
      uniform sampler2D tId; uniform vec2 uRes;
      float idAt(vec2 p) { return floor(texture2D(tId, p / uRes).r * 255.0 + 0.5); }
      void main() {
        vec2 p = gl_FragCoord.xy; float a = idAt(p);
        vec4 o = vec4(1.0);
        for (int i = 0; i < 4; i++) {
          vec2 off = i == 0 ? vec2(1.0, 0.0) : (i == 1 ? vec2(-1.0, 0.0) : (i == 2 ? vec2(0.0, 1.0) : vec2(0.0, -1.0)));
          vec2 q = p + off;
          if (q.x < 0.0 || q.y < 0.0 || q.x > uRes.x || q.y > uRes.y) continue;
          if (abs(a - idAt(q)) > 0.5) o = enc((p + q) * 0.5);
        }
        gl_FragColor = o;
      }`,
  })
  const flood = new THREE.ShaderMaterial({
    uniforms: {
      tSeed: { value: null },
      uRes: { value: new THREE.Vector2() },
      uStep: { value: 1 },
    },
    vertexShader: quadVert,
    fragmentShader: `${codec}
      uniform sampler2D tSeed; uniform vec2 uRes; uniform float uStep;
      void main() {
        vec2 p = gl_FragCoord.xy; float best = 1e9; vec4 bt = vec4(1.0);
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 q = p + vec2(float(x), float(y)) * uStep;
            if (q.x < 0.0 || q.y < 0.0 || q.x > uRes.x || q.y > uRes.y) continue;
            vec4 t = texture2D(tSeed, q / uRes);
            if (isEmpty(t)) continue;
            float d = distance(dec(t), p);
            if (d < best) { best = d; bt = t; }
          }
        }
        gl_FragColor = bt;
      }`,
  })
  const composite = new THREE.ShaderMaterial({
    uniforms: {
      tSeed: { value: null },
      uColour: { value: null },
      uFull: { value: new THREE.Vector2() },
      uScale: { value: new THREE.Vector2() },
      uHalf: { value: 1 },
    },
    vertexShader: quadVert,
    fragmentShader: `${codec}
      uniform sampler2D tSeed; uniform vec3 uColour; uniform vec2 uFull, uScale; uniform float uHalf;
      void main() {
        vec4 s = texture2D(tSeed, gl_FragCoord.xy / uFull);
        if (isEmpty(s)) discard;
        float a = clamp(uHalf + 0.5 - distance(gl_FragCoord.xy, dec(s) * uScale), 0.0, 1.0);
        if (a < 0.002) discard;
        gl_FragColor = vec4(uColour, a);
      }`,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  })
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), seed)
  quad.frustumCulled = false
  scene.add(quad)

  const options = {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,
    depthBuffer: false,
  }
  let id, a, b
  const full = new THREE.Vector2()
  const res = new THREE.Vector2()

  const run = (renderer, material, target) => {
    quad.material = material
    renderer.setRenderTarget(target)
    renderer.render(scene, camera)
  }

  return {
    resize(renderer) {
      ;[id, a, b].forEach((t) => t && t.dispose())
      renderer.getDrawingBufferSize(full)
      const factor = renderer.getPixelRatio() >= 2 ? 2 : 1
      res.set(
        Math.max(1, Math.floor(full.x / factor)),
        Math.max(1, Math.floor(full.y / factor))
      )
      id = new THREE.WebGLRenderTarget(res.x, res.y, {
        ...options,
        depthBuffer: true,
      })
      a = new THREE.WebGLRenderTarget(res.x, res.y, options)
      b = new THREE.WebGLRenderTarget(res.x, res.y, options)
      seed.uniforms.uRes.value.copy(res)
      flood.uniforms.uRes.value.copy(res)
      composite.uniforms.uFull.value.copy(full)
      composite.uniforms.uScale.value.set(full.x / res.x, full.y / res.y)
    },
    // ids: scene of id meshes; half: half the line width in device px
    render(renderer, ids, camera, colour, half) {
      renderer.setRenderTarget(id)
      renderer.clear()
      renderer.render(ids, camera)

      const reach = half / composite.uniforms.uScale.value.y + 2
      let start = 1
      while (2 * start - 1 < reach) start *= 2
      const steps = []
      for (let s = start; s >= 1; s /= 2) steps.push(s)
      steps.push(1)

      let src = steps.length % 2 === 0 ? a : b
      let dst = src === a ? b : a
      seed.uniforms.tId.value = id.texture
      run(renderer, seed, src)
      for (const s of steps) {
        flood.uniforms.tSeed.value = src.texture
        flood.uniforms.uStep.value = s
        run(renderer, flood, dst)
        ;[src, dst] = [dst, src]
      }
      composite.uniforms.tSeed.value = src.texture
      composite.uniforms.uColour.value = colour
      composite.uniforms.uHalf.value = half
      run(renderer, composite, null)
    },
    dispose() {
      ;[id, a, b].forEach((t) => t && t.dispose())
    },
  }
}

// ---------- scene ----------

export function mount(canvas) {
  const section = canvas.parentElement
  const svgs = [...section.querySelectorAll('[data-model]')].filter(
    (el) => el.getClientRects().length > 0
  )
  if (!svgs.length) return null

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  })
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.setClearColor(0x000000, 0)
  renderer.autoClear = false
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  const ids = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000)
  camera.position.z = 2000
  const outline = outlinePass()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const dark = window.matchMedia('(prefers-color-scheme: dark)')
  let colours = readColours(section)

  let nextId = 1
  const objects = svgs.map((svg, index) => {
    const model = svg.dataset.model
    const group = new THREE.Group()
    const idGroup = new THREE.Group()
    const meshes = []
    let texture = null
    const add = (geometry, material, id) => {
      const mesh = new THREE.Mesh(geometry, material)
      group.add(mesh)
      meshes.push(mesh)
      idGroup.add(new THREE.Mesh(geometry, idMaterial(id)))
    }
    if (model === 'pencil' || model === 'pencil-mono') {
      const base = nextId
      const parts = model === 'pencil' ? pencil(colours) : pencilMono(colours)
      parts.forEach(([geometry, material, part]) =>
        add(geometry, material, base + part)
      )
      nextId = base + Math.max(...parts.map((p) => p[2])) + 1
    } else {
      const made = extruded(svg, DEPTH[model] ?? ICON_DEPTH, colours)
      texture = made.texture
      add(made.geometry, made.materials, nextId++)
      paint(svg, texture)
    }
    scene.add(group)
    ids.add(idGroup)

    const { width: vw } = svg.viewBox.baseVal
    const size = parseFloat(svg.getAttribute('width')) || vw
    const object = {
      svg,
      group,
      idGroup,
      meshes,
      texture,
      scale: size / vw,
      size: Math.max(size, parseFloat(svg.getAttribute('height')) || size),
      z: (index - svgs.length) * 50,
      base: new THREE.Quaternion(),
      spin: new THREE.Quaternion(),
      velocity: V(0, 0, 0),
      tilt: new THREE.Vector2(),
      target: new THREE.Vector2(),
      centre: new THREE.Vector2(),
    }
    svg.style.visibility = 'hidden'
    return object
  })

  // Copy each SVG’s on-screen position and rotation onto its model
  let width = 0
  let height = 0
  const measure = () => {
    const box = section.getBoundingClientRect()
    width = box.width
    height = box.height
    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    outline.resize(renderer)
    for (const o of objects) {
      const r = o.svg.getBoundingClientRect()
      o.centre.set(
        r.left + r.width / 2 - box.left,
        r.top + r.height / 2 - box.top
      )
      const style = getComputedStyle(o.svg)
      let angle =
        style.rotate && style.rotate !== 'none' ? parseFloat(style.rotate) : 0
      if (style.transform && style.transform !== 'none') {
        const m = new DOMMatrix(style.transform)
        angle += (Math.atan2(m.b, m.a) * 180) / Math.PI
      }
      o.base.setFromAxisAngle(V(0, 0, 1), (-angle * Math.PI) / 180)
      for (const g of [o.group, o.idGroup]) {
        g.position.set(o.centre.x - width / 2, height / 2 - o.centre.y, o.z)
        g.scale.setScalar(o.scale)
      }
    }
  }
  measure()

  // ---------- pointer ----------
  const pointer = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()
  let inside = false
  let dragging = null
  let last = null

  const pick = (x, y) => {
    pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1)
    raycaster.setFromCamera(pointer, camera)
    const hit = raycaster.intersectObjects(
      objects.flatMap((o) => o.meshes),
      false
    )[0]
    return hit && objects.find((o) => o.meshes.includes(hit.object))
  }
  const local = (e) => {
    const box = section.getBoundingClientRect()
    return [e.clientX - box.left, e.clientY - box.top]
  }
  const onMove = (e) => {
    const [x, y] = local(e)
    inside = x >= 0 && y >= 0 && x <= width && y <= height
    if (dragging) {
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      last = { x: e.clientX, y: e.clientY }
      dragging.velocity.set(dy * 0.012, dx * 0.012, 0)
      spinBy(dragging, dragging.velocity)
      return
    }
    for (const o of objects) {
      if (!inside || reduced.matches) {
        o.target.set(0, 0)
        continue
      }
      const reach = MAX_TILT * Math.min(1, 120 / o.size)
      o.target.set(
        reach * Math.tanh((x - o.centre.x) / 500),
        reach * Math.tanh((y - o.centre.y) / 500)
      )
    }
    section.style.cursor = inside && pick(x, y) ? 'grab' : ''
  }
  const onDown = (e) => {
    if (e.button !== 0) return
    const [x, y] = local(e)
    const hit = pick(x, y)
    if (!hit) return
    e.preventDefault()
    dragging = hit
    last = { x: e.clientX, y: e.clientY }
    section.setPointerCapture(e.pointerId)
    section.style.cursor = 'grabbing'
  }
  const onUp = (e) => {
    if (!dragging) return
    dragging = null
    if (section.hasPointerCapture(e.pointerId))
      section.releasePointerCapture(e.pointerId)
    section.style.cursor = ''
  }
  const onLeave = () => {
    inside = false
    for (const o of objects) o.target.set(0, 0)
  }

  const turn = new THREE.Quaternion()
  const axis = V(0, 0, 0)
  const spinBy = (o, v) => {
    const angle = v.length()
    if (angle < 1e-5) return
    turn.setFromAxisAngle(axis.copy(v).divideScalar(angle), angle)
    o.spin.premultiply(turn)
  }

  // ---------- frame ----------
  const rest = new THREE.Quaternion()
  const lean = new THREE.Quaternion()
  const euler = new THREE.Euler()
  let visible = true
  let frame = 0
  const draw = () => {
    frame = requestAnimationFrame(draw)
    if (!visible) return
    for (const o of objects) {
      o.tilt.lerp(o.target, 0.1)
      if (o !== dragging) {
        o.velocity.multiplyScalar(0.92)
        spinBy(o, o.velocity)
        o.spin.slerp(rest, 0.06)
      }
      lean.setFromEuler(euler.set(o.tilt.y, o.tilt.x, 0))
      const q = lean.multiply(o.spin).multiply(o.base)
      o.group.quaternion.copy(q)
      o.idGroup.quaternion.copy(q)
    }
    renderer.setRenderTarget(null)
    renderer.clear()
    renderer.render(scene, camera)
    outline.render(
      renderer,
      ids,
      camera,
      colours.line,
      renderer.getPixelRatio()
    )
  }

  // ---------- theme, size and visibility ----------
  const retheme = () => {
    const next = readColours(section)
    for (const [k, v] of Object.entries(next)) colours[k].copy(v)
    for (const o of objects) if (o.texture) paint(o.svg, o.texture)
  }
  const resizer = new ResizeObserver(measure)
  resizer.observe(section)
  const watcher = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  watcher.observe(section)
  dark.addEventListener('change', retheme)
  window.addEventListener('pointermove', onMove, { passive: true })
  section.addEventListener('pointerdown', onDown)
  section.addEventListener('pointerup', onUp)
  section.addEventListener('pointercancel', onUp)
  section.addEventListener('pointerleave', onLeave)
  draw()

  return {
    dispose() {
      cancelAnimationFrame(frame)
      resizer.disconnect()
      watcher.disconnect()
      dark.removeEventListener('change', retheme)
      window.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerdown', onDown)
      section.removeEventListener('pointerup', onUp)
      section.removeEventListener('pointercancel', onUp)
      section.removeEventListener('pointerleave', onLeave)
      section.style.cursor = ''
      for (const o of objects) o.svg.style.visibility = ''
      scene.traverse((m) => {
        if (!m.isMesh) return
        m.geometry.dispose()
        ;[].concat(m.material).forEach((mat) => {
          mat.map?.dispose()
          mat.dispose()
        })
      })
      outline.dispose()
      renderer.dispose()
    },
  }
}
