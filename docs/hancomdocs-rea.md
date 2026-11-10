# 한컴독스 REA 1차 분석

사용자가 제공한 공유 보고서에 REA의 임시 Chrome 세션으로 접근했다. 원본 수정 없이 공유 안내에서 뷰어를 열었다.

## 근거

- 공유 진입 Evidence: `ev_1221f7680e30a165a59a39d0fbfee0ff2306554fb69bf5f5ca0b9f99d8aaa4d1`
- 뷰어 Evidence: `ev_0d5e4f7a85b279489654d34f5d033617c041fa6aff78f6ce3c2371ed6fb21208`
- REA capture_browser_scenario로 DOM, 접근성, 네트워크 이벤트, 프레임, Worker, WebSocket을 관찰했다.
- 위 ID는 분석 세션의 참조이며, 이 저장소에 원본 Evidence 전체를 보관한 것은 아니다. 개인 문서 URL, 세션 정보 및 원시 통신 내용은 포함하지 않는다.

## 관찰

| 영역 | 확인한 사항 |
|---|---|
| 공유 진입 | 편집 허용 문서이지만 비로그인 사용자는 편집하려면 로그인해야 한다는 안내 |
| 파일 관리 | api.hancomdocs.com의 메타데이터·공유 링크·원격 열기 경로 호출 |
| 전용 앱 | webhwp.hancomdocs.com의 HWP_VIEWER 화면으로 이동 |
| 문서 표시 | PaperCanvas, EditCanvas라는 canvas 두 개 존재 |
| 메뉴 | data-command 속성 및 글자·문단·표·셀·쪽 설정 대화상자 식별자 존재 |
| 리소스 | JavaScript 분할 파일, 메뉴 XML, 글꼴과 아이콘 별도 로드 |
| 백그라운드 | Worker 네 개 생성 관찰 |
| 통신 | 문서 열기·리소스 요청 및 WebSocket 송수신 관찰 |

## 해석

공유·파일 관리에서 HWP 전용 앱으로 연결되고, 앱에서 문서 리소스 및 세션 통신을 처리하는 구조와 부합한다. canvas 각각의 역할, Worker의 작업 내용은 미확인이다.

## 미확인

저장 형식, 자동 저장 주기, 공동 편집 충돌 해결, 서버 DB, 내부 문서 모델, 붙여넣기 처리는 확인하지 않았다. WebSocket 관찰만으로 OT/CRDT 사용 여부를 판단할 수 없다. 내부 요청 경로는 지원되는 외부 API임을 뜻하지 않는다.

편집 기능 분석에는 로그인된 대상 화면 접근이 필요하다. 이는 개발할 서비스에 로그인을 추가한다는 뜻이 아니다.
