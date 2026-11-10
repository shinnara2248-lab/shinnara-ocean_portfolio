import { prefersReducedMotion } from '../hooks/useReducedMotion.js';
import { clamp, nearestSafe, safe, slide, routeWaypoint, followTarget, springStep } from '../utils/otterMotion.js';

const STATES = {
  // Let neutral expressions rest; a blink is brief rather than a constant face change.
  idle: {row:0,frames:6,durations:[2400,220,1800,180,1600,220]},
  right:{row:1,frames:8,duration:190}, left:{row:2,frames:8,duration:190},
  // Click gestures play once, then settle while the speech bubble remains visible.
  wave:{row:3,frames:4,duration:420,once:true,rest:2},
  jump:{row:4,frames:5,duration:260,once:true,rest:0},
  think:{row:7,frames:6,duration:480,once:true,rest:5},
  review:{row:8,frames:6,duration:520,once:true,rest:3},
};
// Mouse tracking, collision avoidance and sprite playback.
export function startOtter({ ot, sprite, reactionRef, hoverRef }) {
    const page=document.getElementById('page');
    const sea=document.getElementById('sea'), waves=document.querySelector('.waves'), stage=document.querySelector('.dive-stage');
    if(!ot||!page||!sea||!waves)return;
    const reduce=prefersReducedMotion();
    let position=null,pointer=null,raf=0,last=0,measured=0,geometry=null;
    let velocity={x:0,y:0},facing='right',cameraTop=null;
    let state='idle',frame=0,frameAt=performance.now(),lastPosition='',finished=false;
    let candidate='idle',candidateAt=0;
    const measure=()=>{
      const root=page.getBoundingClientRect(),width=ot.offsetWidth,height=ot.offsetHeight;
      const padding=5;
      const obstacles=[...sea.querySelectorAll('.phead, .pcard, .about-panel, .process, .tbox, .contact, #shell, .hint')].map(el=>{
        const r=el.getBoundingClientRect();
        return {l:r.left-root.left-width*.38-padding,r:r.right-root.left+width*.38+padding,
          t:r.top-root.top-height*.44-padding,b:r.bottom-root.top+height*.44+padding};
      });
      geometry={width,height,pw:page.clientWidth,ph:page.clientHeight,obstacles};
    };
    const onMove=e=>{if(e.pointerType==='mouse')pointer={x:e.clientX,y:e.clientY};};
    const leave=()=>{pointer=null;};
    const tick=now=>{
      const dt=Math.min(40,last?now-last:16.7);last=now;
      if(!geometry||now-measured>180){measure();measured=now;}
      const {width,height,pw,ph,obstacles}=geometry;
      const root=page.getBoundingClientRect(),water=waves.getBoundingClientRect();
      const surface=water.top-root.top+water.height*.74;
      const progress=Number.parseFloat(getComputedStyle(stage).getPropertyValue('--dive'))||0;
      const bounds={minX:width/2+8,maxX:pw-width/2-8,
        minY:Math.max(surface+height/2+16,-root.top+height/2+8),
        maxY:Math.min(ph-height/2-16,-root.top+innerHeight-height/2-8)};
      bounds.minY=Math.min(bounds.minY,bounds.maxY);
      const home={x:pw-width/2-10,y:Math.max(bounds.minY,-root.top+innerHeight*.7)};
      const entering=progress<1&&sea.getBoundingClientRect().top>innerHeight*.6;
      if(entering){home.x=pw*.78;home.y=bounds.minY;}
      // Scrolling moves the camera; preserve the companion's screen position instead of chasing it down the document.
      if(position&&!entering&&cameraTop!==null){position.y=clamp(position.y+cameraTop-root.top,bounds.minY,bounds.maxY);}
      cameraTop=root.top;
      if(!position)position={...home};
      let target=(reactionRef.current||hoverRef.current)?position:(pointer?{x:pointer.x-root.left,y:pointer.y-root.top}:position);
      // Stop short of the cursor so the companion remains easy to click.
      if(pointer&&!reactionRef.current&&!hoverRef.current){const dx=target.x-position.x,dy=target.y-position.y,d=Math.hypot(dx,dy);if(d>0){const stop=Math.min(28,d);target={x:target.x-dx/d*stop,y:target.y-dy/d*stop};}}
      target={x:clamp(target.x,bounds.minX,bounds.maxX),y:clamp(target.y,bounds.minY,bounds.maxY)};
      // Project the cursor onto the nearest reachable open area, never a route outside the viewport.
      position={x:clamp(position.x,bounds.minX,bounds.maxX),y:clamp(position.y,bounds.minY,bounds.maxY)};
      const free=followTarget(position,target,obstacles,bounds);
      let active='idle';
      if(free){
        // Layout changes can move an obstacle onto a resting pet; recover into the reserved lane.
        if(!safe(position,obstacles)){position=nearestSafe(position,obstacles,bounds,home)||position;velocity={x:0,y:0};}
        const waypoint=routeWaypoint(position,free,obstacles,bounds);
        const motion=springStep(position,velocity,waypoint,dt/1000);
        velocity=motion.velocity;
        let proposed=reduce?waypoint:motion.position;
        if(!reduce){
          const travel=Math.hypot(proposed.x-position.x,proposed.y-position.y),limit=420*dt/1000;
          if(travel>limit){const scale=limit/travel;proposed={x:position.x+(proposed.x-position.x)*scale,y:position.y+(proposed.y-position.y)*scale};}
          const speed=Math.hypot(velocity.x,velocity.y);
          if(speed>420){velocity.x*=420/speed;velocity.y*=420/speed;}
        }
        // Anchor only vertical movement to the actual rising water; horizontal travel remains smooth.
        if(entering&&!pointer&&!reactionRef.current&&!hoverRef.current){proposed.y=free.y;velocity.y=0;}
        const next=slide(position,proposed,obstacles);
        if(Math.abs(next.x-proposed.x)>.05)velocity.x=0;
        if(Math.abs(next.y-proposed.y)>.05)velocity.y=0;
        const dx=next.x-position.x, speed=Math.hypot(dx,next.y-position.y)/dt;
        if(Math.abs(dx)>.08)facing=dx<0?'left':'right';
        if(speed>.025)active=facing;
        position=next;
      }
      const show=free!==null;
      ot.style.visibility=show?'visible':'hidden';
      ot.style.transform=`translate3d(${position.x-width/2}px,${position.y-height/2}px,0)`;
      active=reactionRef.current?.state||active;
      // Ignore momentary speed/direction changes near the cursor and card edges.
      if(active!==candidate){candidate=active;candidateAt=now;}
      if(active!==state&&(reactionRef.current||now-candidateAt>=260)){
        state=active;frame=0;frameAt=now;finished=false;ot.dataset.state=state;
      }
      const animation=STATES[state];
      const duration=animation.durations?.[frame]||animation.duration;
      if(!reduce&&!finished&&now-frameAt>=duration){
        if(frame+1<animation.frames)frame+=1;
        else if(animation.once){frame=animation.rest;finished=true;}
        else frame=0;
        frameAt=now;
      }
      const css=`${(reduce?0:frame)/7*100}% ${animation.row/10*100}%`;
      if(css!==lastPosition){sprite.style.backgroundPosition=css;lastPosition=css;}
      const bubble=ot.querySelector('#say');
      if(reactionRef.current&&bubble){
        const half=bubble.offsetWidth/2,center=position.x+root.left;
        bubble.style.left=`${width/2+clamp(center,half+12,document.documentElement.clientWidth-half-12)-center}px`;
      }
      raf=requestAnimationFrame(tick);
    };
    measure();raf=requestAnimationFrame(tick);
    window.addEventListener('pointermove',onMove,{passive:true});document.documentElement.addEventListener('pointerleave',leave);
    window.addEventListener('blur',leave);window.addEventListener('resize',measure);
    const ro=new ResizeObserver(measure);ro.observe(page);ro.observe(ot);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();window.removeEventListener('pointermove',onMove);document.documentElement.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);window.removeEventListener('resize',measure);};
}
