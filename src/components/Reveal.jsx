import { useEffect, useRef, useState } from 'react';

// 스크롤로 화면에 들어오면 한 번만 'on' 클래스를 붙여 스르륵 나타나게 하는 공통 컴포넌트.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={['rv', className, on && 'on'].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
