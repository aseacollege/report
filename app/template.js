export const reportTemplate = () => `<h1 style="text-align:center">주간업무보고서</h1>
<table><tbody><tr><th>작성부서</th><td>부서를 입력하세요</td><th>보고기간</th><td>금주 / 차주</td></tr><tr><th>작성자</th><td>이름</td><th>검토자</th><td>이름</td></tr></tbody></table>
<h2>부서별 근태 현황</h2><table><tbody><tr><th>구분</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th></tr><tr><th>연차 / 반차</th><td><p>0 / 0</p></td><td><p>0 / 0</p></td><td><p>0 / 0</p></td><td><p>0 / 0</p></td><td><p>0 / 0</p></td></tr><tr><th>출장</th><td><p>0</p></td><td><p>0</p></td><td><p>0</p></td><td><p>0</p></td><td><p>0</p></td></tr></tbody></table>
<h2>과정 운영</h2><p>상단의 <strong>과정 등록·수정</strong> 버튼으로 과정을 관리하고 보고서에 요약을 넣을 수 있습니다.</p>
<table><tbody><tr><th colwidth="110">구분</th><th colwidth="546">보고 사항</th></tr><tr><th>처리 완료 및<br>진행 중 업무</th><td><p><strong>1. 금주 주요 업무</strong></p><p>업무 내용과 진행 상황을 입력하세요.</p><p></p><p><strong>2. 협의 및 검토 사항</strong></p><p>담당자와 처리 계획을 입력하세요.</p></td></tr><tr><th>추진 계획 업무</th><td><p><strong>1. 차주 추진 계획</strong></p><p>일정과 주요 내용을 입력하세요.</p><p></p><p><strong>2. 준비 및 협조 사항</strong></p><p>필요한 사항을 입력하세요.</p></td></tr><tr><th>안내사항</th><td><p>공유할 안내사항을 입력하세요.</p></td></tr></tbody></table><p></p>`;
export const blankTemplate = () => '<p></p>';
export function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
