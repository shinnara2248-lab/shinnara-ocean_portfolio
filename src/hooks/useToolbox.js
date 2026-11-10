import { useState } from 'react';

// UI-independent state and actions for the six toolbox demos.
export function useToolbox() {
 const [active,setActive]=useState(0),[region,setRegion]=useState('main'),[gap,setGap]=useState(14),[radius,setRadius]=useState(20),[saved,setSaved]=useState([]),[filter,setFilter]=useState('전체'),[items,setItems]=useState([{id:1,name:'바다 산책',kind:'디자인'},{id:2,name:'진주 발견',kind:'개발'}]),[device,setDevice]=useState('Desktop'),[variant,setVariant]=useState('채움'),[hue,setHue]=useState(0),[light,setLight]=useState(100);
 const toggle=id=>setSaved(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
 const reset=()=>{setRegion('main');setGap(14);setRadius(20);setSaved([]);setFilter('전체');setItems([{id:1,name:'바다 산책',kind:'디자인'},{id:2,name:'진주 발견',kind:'개발'}]);setDevice('Desktop');setVariant('채움');setHue(0);setLight(100)};
 return { active, setActive, region, setRegion, gap, setGap, radius, setRadius, saved, setSaved, filter, setFilter, items, setItems, device, setDevice, variant, setVariant, hue, setHue, light, setLight, toggle, reset };
}
