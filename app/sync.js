import * as Y from 'yjs';
export function toBase64(bytes) {
  let s = ''; for (let i = 0; i < bytes.length; i += 8192) s += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(s);
}
export function fromBase64(text) {
  if (typeof text !== 'string' || text.length > 2800000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(text)) throw new Error('잘못된 문서 데이터입니다.');
  return Uint8Array.from(atob(text), c => c.charCodeAt(0));
}
export function mergeDocument(current, incoming) {
  const doc = new Y.Doc();
  try {
    if (current) Y.applyUpdate(doc, fromBase64(current));
    Y.applyUpdate(doc, fromBase64(incoming));
    return { state: toBase64(Y.encodeStateAsUpdate(doc)), title: String(doc.getMap('meta').get('title') || '제목 없는 보고서').slice(0, 160) };
  } finally { doc.destroy(); }
}
export function validateCourse(data) {
  const result = {};
  for (const key of ['name', 'department', 'person', 'start', 'end', 'status', 'notes']) result[key] = String(data[key] || '').trim();
  if (!result.name || !result.person || !result.start || !result.end) throw new Error('과정명, 담당자, 시작일과 종료일을 입력해 주세요.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result.start) || !/^\d{4}-\d{2}-\d{2}$/.test(result.end) || result.end < result.start) throw new Error('운영 기간을 확인해 주세요.');
  for(const date of [result.start,result.end]) { const parsed=new Date(date+'T00:00:00Z'); if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)throw new Error('유효한 날짜를 입력해 주세요.'); }
  result.people = Number(data.people);
  if (!Number.isInteger(result.people) || result.people < 0 || result.people > 100000) throw new Error('인원은 0~100,000 사이의 정수로 입력해 주세요.');
  if (!['준비', '운영 중', '완료', '보류'].includes(result.status)) throw new Error('운영 상태를 선택해 주세요.');
  if (result.name.length > 200 || result.person.length > 100 || result.department.length > 100 || result.notes.length > 5000) throw new Error('입력 내용이 너무 깁니다.');
  return result;
}
