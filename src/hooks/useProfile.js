import { useState } from 'react';
import { PROFILE } from '../data/profile.js';
const KEY = 'nara-profile-preview-v1';
const copy = value => JSON.parse(JSON.stringify(value));
export function useProfile() {
  const [profile, setProfile] = useState(() => {
    try { return { ...copy(PROFILE), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
    catch { return copy(PROFILE); }
  });
  const [draft, setDraft] = useState(() => copy(profile));
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const update = (key, value) => setDraft(previous => ({ ...previous, [key]: value }));
  const open = () => { setDraft(copy(profile)); setMessage(''); setEditing(true); };
  const cancel = () => { setEditing(false); setMessage(''); };
  const save = event => {
    event.preventDefault();
    try {
      localStorage.setItem(KEY, JSON.stringify(draft));
      setProfile(copy(draft)); setEditing(false);
      setMessage('이 브라우저에 저장했습니다. 공개 사이트 전체에 반영하려면 내 정보 파일을 전달해 주세요.');
    } catch { setMessage('저장 공간이 부족하거나 브라우저 저장이 차단되어 있습니다. 사진을 줄이거나 내 정보 파일을 내려받아 주세요.'); }
  };
  const uploadPhoto = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      setMessage('8MB 이하의 JPG, PNG, WebP 사진을 선택해 주세요.'); return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close(); update('photo', canvas.toDataURL('image/webp', .85));
      setMessage('사진을 불러왔습니다. 저장하면 소개 페이지에 적용됩니다.');
    } catch { setMessage('사진을 읽지 못했습니다. 다른 이미지 파일을 선택해 주세요.'); }
  };
  const exportProfile = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(editing ? draft : profile, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'shin-nara-profile.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const reset = () => {
    try { localStorage.removeItem(KEY); setProfile(copy(PROFILE)); setDraft(copy(PROFILE)); setEditing(false); setMessage('사이트 기본 정보로 돌아왔습니다.'); }
    catch { setMessage('브라우저 저장 설정을 확인해 주세요.'); }
  };
  return { profile, draft, editing, message, update, open, cancel, save, uploadPhoto, exportProfile, reset };
}
