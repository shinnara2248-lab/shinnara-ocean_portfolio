import { useEffect, useRef } from 'react';
import { startSandLogo } from '../../scripts/sandLogo.js';
import logoSrc from '../../assets/logo.webp';

// Sample the original texture: every grain settles onto an actual logo pixel.
export default function SandLogo({ quiet = false }) {
  const ref = useRef(null);
  useEffect(() => {
    return startSandLogo(ref.current, logoSrc, quiet);
  }, [quiet]);
  return <canvas id="sand" ref={ref} width="1500" height="243" role="img" aria-label="SHIN NARA" />;
}
