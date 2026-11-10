export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const inside = (p, b) => p.x > b.l && p.x < b.r && p.y > b.t && p.y < b.b;
export const safe = (p, boxes) => boxes.every(b => !inside(p, b));
export function nearestSafe(target, boxes, bounds, fallback) {
  const {minX, maxX, minY, maxY} = bounds;
  const wanted = {x:clamp(target.x,minX,maxX), y:clamp(target.y,minY,maxY)};
  if (safe(wanted,boxes)) return wanted;
  let best = safe(fallback,boxes) ? fallback : null, score = Infinity;
  const xs = [wanted.x,minX,maxX,...boxes.flatMap(b=>[b.l-1,b.r+1])];
  const ys = [wanted.y,minY,maxY,...boxes.flatMap(b=>[b.t-1,b.b+1])];
  for (const x of xs) for (const y of ys) {
    if(x<minX||x>maxX||y<minY||y>maxY) continue;
    const p={x,y}, d=(x-wanted.x)**2+(y-wanted.y)**2;
    if(d<score&&safe(p,boxes)){best=p;score=d;}
  }
  return best;
}
// Sweep the whole segment, not just its endpoint: a fast pointer cannot tunnel through a card.
export function sweep(from, to, boxes) {
  const dx=to.x-from.x, dy=to.y-from.y;
  let fraction=1;
  for(const b of boxes){
    let enter=0, exit=1, hit=true;
    for(const [start, delta, lo, hi] of [[from.x,dx,b.l,b.r],[from.y,dy,b.t,b.b]]){
      if(Math.abs(delta)<1e-8){if(start<=lo||start>=hi){hit=false;break;}}
      else {const a=(lo-start)/delta,c=(hi-start)/delta;enter=Math.max(enter,Math.min(a,c));exit=Math.min(exit,Math.max(a,c));}
    }
    if(hit&&enter<exit&&exit>0&&enter<1) fraction=Math.min(fraction,Math.max(0,enter-.001));
  }
  return {x:from.x+dx*fraction,y:from.y+dy*fraction};
}
export function slide(from,to,boxes){
  const direct=sweep(from,to,boxes);
  const a=sweep(sweep(direct,{x:to.x,y:direct.y},boxes),to,boxes);
  const b=sweep(sweep(direct,{x:direct.x,y:to.y},boxes),to,boxes);
  const distance=p=>(p.x-to.x)**2+(p.y-to.y)**2;
  return distance(a)<distance(b)?a:b;
}
// Shortest visible route through padded obstacle corners, allowing either side of the page.
export function routeWaypoint(from, to, boxes, bounds) {
  const visible=(a,b)=>{const hit=sweep(a,b,boxes);return Math.hypot(hit.x-b.x,hit.y-b.y)<.01;};
  if(visible(from,to))return to;
  const corners=boxes.flatMap(b=>[
    {x:b.l-1,y:b.t-1},{x:b.r+1,y:b.t-1},
    {x:b.l-1,y:b.b+1},{x:b.r+1,y:b.b+1},
  ]).filter(p=>p.x>=bounds.minX&&p.x<=bounds.maxX&&p.y>=bounds.minY&&p.y<=bounds.maxY&&safe(p,boxes));
  const nodes=[from,to,...corners],dist=nodes.map(()=>Infinity),prev=[],visited=new Set();dist[0]=0;
  for(let step=0;step<nodes.length;step++){
    let u=-1;for(let i=0;i<nodes.length;i++)if(!visited.has(i)&&(u<0||dist[i]<dist[u]))u=i;
    if(u<0||!Number.isFinite(dist[u]))break;
    if(u===1){let n=1;while(prev[n]!==0&&prev[n]!==undefined)n=prev[n];return nodes[n];}
    visited.add(u);
    for(let v=0;v<nodes.length;v++){
      if(visited.has(v)||!visible(nodes[u],nodes[v]))continue;
      const cost=dist[u]+Math.hypot(nodes[u].x-nodes[v].x,nodes[u].y-nodes[v].y);
      if(cost<dist[v]){dist[v]=cost;prev[v]=u;}
    }
  }
  return from;
}
// Exact critically damped spring: the same response at 30, 60 and 120 fps.
export function springStep(position,velocity,target,dt,frequency=7){
  const decay=Math.exp(-frequency*dt),next={},speed={};
  for(const axis of ['x','y']){
    const offset=position[axis]-target[axis],j=velocity[axis]+frequency*offset;
    next[axis]=target[axis]+(offset+j*dt)*decay;
    speed[axis]=(velocity[axis]-frequency*j*dt)*decay;
  }
  return {position:next,velocity:speed};
}

// Follow the cursor as closely as the visible, reachable space permits.
export function followTarget(from, target, boxes, bounds) {
  const origin = nearestSafe(from, boxes, bounds, from);
  if (!origin) return null;
  const wanted = nearestSafe(target, boxes, bounds, origin);
  if (!wanted) return origin;
  const reachable = p => {
    if (Math.hypot(p.x-origin.x,p.y-origin.y)<.01) return true;
    const next=routeWaypoint(origin,p,boxes,bounds);
    return Math.hypot(next.x-origin.x,next.y-origin.y)>.01;
  };
  if (reachable(wanted)) return wanted;
  // A card spanning the viewport can disconnect the lanes. Stay alongside the
  // pointer on this side instead of travelling to a distant offscreen corner.
  const xs=[origin.x,bounds.minX,bounds.maxX,...boxes.flatMap(b=>[b.l-1,b.r+1])];
  const ys=[clamp(target.y,bounds.minY,bounds.maxY),origin.y,bounds.minY,bounds.maxY];
  let best=origin,score=Infinity;
  for(const x of xs)for(const y of ys){
    const p={x,y};
    if(x<bounds.minX||x>bounds.maxX||y<bounds.minY||y>bounds.maxY||!safe(p,boxes))continue;
    const distance=(x-target.x)**2+(y-target.y)**2;
    if(distance<score&&reachable(p)){best=p;score=distance;}
  }
  return best;
}
