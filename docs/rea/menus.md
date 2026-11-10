# 한컴독스 메뉴 조사

로그인된 한국어 `HWP_EDITOR` 화면에서 관찰했다. 상위 메뉴 9개는 직접 열었으며, 아래 151개 항목에는 하위 메뉴의 부모 항목과 DOM에 존재하는 하위 선택지도 포함된다. 개별 명령 실행·저장·모든 하위 메뉴 펼침을 검증한 목록은 아니다.

웹 메뉴에 표시된 단축키는 비교용이다. 개발의 우선 기준은 [데스크톱 한글 단축키](desktop-shortcuts.md)이다.

## 파일

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 파일 | 저장하기 | d_save |  | Ctrl+S |
| 파일 | 다른 이름으로 저장하기 | dialog_save_as |  | Alt+V |
| 파일 | 공유 | share |  |  |
| 파일 | 이름 바꾸기 | d_rename |  |  |
| 파일 | 다운로드 | d_download |  |  |
| 파일 | PDF로 다운로드 | d_pdf_download |  |  |
| 파일 | 편집 용지... | dialog_page_setup |  | F7 |
| 파일 | 인쇄 | d_print |  | Ctrl+P |
| 파일 | 문서 정보... | dialog_document_info |  | Ctrl+Q+I |

## 편집

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 편집 | 되돌리기 | e_undo |  | Ctrl+Z |
| 편집 | 다시 실행 | e_redo |  | Ctrl+Shift+Z |
| 편집 | 오려 두기 | e_cut |  | Ctrl+X |
| 편집 | 복사하기 | e_copy |  | Ctrl+C |
| 편집 | 붙이기 | e_paste |  | Ctrl+V |
| 편집 | 모양 복사... | e_format_copy |  | Ctrl+Alt+C |
| 편집 | 지우기 | e_delete |  | Ctrl+E |
| 편집 | 조판 부호 지우기 | dialog_delete_ctrls |  |  |
| 편집 | 모두 선택 | e_select | select_all | Ctrl+A |
| 편집 | 찾기 |  |  |  |
| 편집/찾기 | 찾기... | dialog_find |  | Ctrl+F |
| 편집/찾기 | 찾아 바꾸기... | dialog_find_replace |  | Ctrl+H |
| 편집/찾기 | 찾아가기 | dialog_goto |  | Alt+G |

## 보기

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 보기 | 확대/축소 |  |  |  |
| 보기/확대/축소 | 50% | e_view_scale | 50 |  |
| 보기/확대/축소 | 75% | e_view_scale | 75 |  |
| 보기/확대/축소 | 100% | e_view_scale | 100 |  |
| 보기/확대/축소 | 125% | e_view_scale | 125 |  |
| 보기/확대/축소 | 150% | e_view_scale | 150 |  |
| 보기/확대/축소 | 200% | e_view_scale | 200 |  |
| 보기/확대/축소 | 300% | e_view_scale | 300 |  |
| 보기/확대/축소 | 쪽 맞춤 | e_view_scale | fitInWindow |  |
| 보기/확대/축소 | 폭 맞춤 | e_view_scale | fitWidth |  |
| 보기 | 쪽 모양 |  |  |  |
| 보기/쪽 모양 | 한 쪽 | e_view_zoom_page_one |  |  |
| 보기/쪽 모양 | 두 쪽 | e_view_zoom_page_two |  |  |
| 보기/쪽 모양 | 세 쪽 | e_view_zoom_page_three |  |  |
| 보기 | 쪽 윤곽 | e_view_option_paper |  | Ctrl+G+L |
| 보기 | 표시/숨기기 |  |  |  |
| 보기/표시/숨기기 | 조판 부호 | e_ctrl_mark |  | Ctrl+G+C |
| 보기/표시/숨기기 | 문단 부호 | e_para_mark |  | Alt+G+T |
| 보기/표시/숨기기 | 투명 선 | t_border_transparent |  |  |
| 보기 | 격자 보기 | d_grid |  |  |
| 보기 | 도구 상자 |  |  |  |
| 보기/도구 상자 | 기본 | view_basic |  |  |
| 보기/도구 상자 | 서식 | view_format |  |  |
| 보기 | 문서 창 |  |  |  |
| 보기/문서 창 | 눈금자 | e_ruler |  |  |
| 보기 | 메모 |  |  |  |
| 보기/메모 | 모든 메모 표시 | e_menu_view_memo |  |  |
| 보기/메모 | 메모 안내선 표시 | e_menu_view_memo_guide |  |  |

## 입력

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 입력 | 도형 |  |  |  |
| 입력/도형 | 가로 글상자 | s_insert_shape | horiz_text_box |  |
| 입력/도형 | 직사각형 | s_insert_shape | rectangle |  |
| 입력/도형 | 타원 | s_insert_shape | ellipse |  |
| 입력/도형 | 직선 | s_insert_shape | line |  |
| 입력/도형 | 호 | s_insert_shape | arc |  |
| 입력 | 그림... | dialog_insert_image |  | Alt+N+I |
| 입력 | 표... | dialog_insert_table |  |  |
| 입력 | 차트... | dialog_insert_chart |  |  |
| 입력 | 글상자 | s_insert_textbox |  | Alt+N+B |
| 입력 | 웹 동영상... | dialog_insert_web_video |  |  |
| 입력 | 수식... | dialog_edit_formula |  | Ctrl+N+M |
| 입력 | 문자표... | dialog_insert_symbols |  | Ctrl+F10 |
| 입력 | 필드 입력... | dialog_insert_modify_field |  | Ctrl+K+E |
| 입력 | 문단 띠 | s_insert_line |  | Alt+N+L |
| 입력 | 주석 |  |  |  |
| 입력/주석 | 각주 | e_insert_notes | footnote |  |
| 입력/주석 | 미주 | e_insert_notes | endnote |  |
| 입력 | 캡션 넣기 |  |  |  |
| 입력/캡션 넣기 | 위 | e_insert_caption | top |  |
| 입력/캡션 넣기 | 왼쪽 위 | e_insert_caption | left_top |  |
| 입력/캡션 넣기 | 왼쪽 가운데 | e_insert_caption | left_center |  |
| 입력/캡션 넣기 | 왼쪽 아래 | e_insert_caption | left_bottom |  |
| 입력/캡션 넣기 | 오른쪽 위 | e_insert_caption | right_top |  |
| 입력/캡션 넣기 | 오른쪽 가운데 | e_insert_caption | right_center |  |
| 입력/캡션 넣기 | 오른쪽 아래 | e_insert_caption | right_bottom |  |
| 입력/캡션 넣기 | 아래 | e_insert_caption | bottom |  |
| 입력/캡션 넣기 | 캡션 없음 | e_insert_caption | none |  |
| 입력 | 메모 | e_menu_insert_memo |  |  |
| 입력 | 하이퍼링크... | dialog_insert_modify_hyperlink |  | Ctrl+K+H |
| 입력 | 책갈피... | dialog_bookmark |  | Ctrl+K+B |

## 서식

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 서식 | 글자 모양... | dialog_char_shape |  | Alt+L |
| 서식 | 문단 모양... | dialog_para_shape |  | Alt+T |
| 서식 | 글머리표 모양... | dialog_paragraph_number_bullet_list |  |  |
| 서식 | 문단 번호 모양... | dialog_paragraph_number_bullet_list |  | Alt+K+N |
| 서식 | 한 수준 증가 | p_level_increase |  | Ctrl+Num - |
| 서식 | 한 수준 감소 | p_level_decrease |  | Ctrl+Num + |
| 서식 | 스타일... | dialog_style_normal |  | F6 |
| 서식 | 개체 속성... | modify_object_properties |  | P |

## 쪽

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 쪽 | 편집 용지... | dialog_page_setup |  | F7 |
| 쪽 | 머리말 |  |  |  |
| 쪽/머리말 | (모양 없음) | e_insert_header | none |  |
| 쪽/머리말 | 왼쪽 쪽 번호 | e_insert_header | left |  |
| 쪽/머리말 | 가운데 쪽 번호 | e_insert_header | center |  |
| 쪽/머리말 | 오른쪽 쪽 번호 | e_insert_header | right |  |
| 쪽 | 꼬리말 |  |  |  |
| 쪽/꼬리말 | (모양 없음) | e_insert_footer | none |  |
| 쪽/꼬리말 | 왼쪽 쪽 번호 | e_insert_footer | left |  |
| 쪽/꼬리말 | 가운데 쪽 번호 | e_insert_footer | center |  |
| 쪽/꼬리말 | 오른쪽 쪽 번호 | e_insert_footer | right |  |
| 쪽 | 새 번호로 시작... | dialog_new_number |  |  |
| 쪽 | 현재 쪽만 감추기... | dialog_page_hiding |  | Alt+N+S |
| 쪽 | 쪽 나누기 | p_page_break |  | Ctrl+Enter |
| 쪽 | 단 나누기 | p_column_break |  | Ctrl+Shift+Enter |
| 쪽 | 단 |  |  |  |
| 쪽/단 | 하나 | p_column_one |  |  |
| 쪽/단 | 둘 | p_column_two |  |  |
| 쪽/단 | 셋 | p_column_three |  |  |
| 쪽/단 | 왼쪽 | p_column_left |  |  |
| 쪽/단 | 오른쪽 | p_column_right |  |  |
| 쪽 | 다단 설정 나누기 | p_break_new_column |  | Ctrl+Alt+Enter |

## 표

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 표 | 표 만들기... | dialog_insert_table |  | Alt+N+T |
| 표 | 표/셀 속성... | dialog_edit_table |  |  |
| 표 | 셀 테두리/배경 |  |  |  |
| 표/셀 테두리/배경 | 각 셀마다 적용... | dialog_cell_border_fill |  |  |
| 표/셀 테두리/배경 | 하나의 셀처럼 적용... | dialog_cell_zone_border_fill |  |  |
| 표 | 줄/칸 추가하기 |  |  |  |
| 표/줄/칸 추가하기 | 위쪽에 줄 추가하기 | c_insert_row_col_list | insert_upper_row |  |
| 표/줄/칸 추가하기 | 아래쪽에 줄 추가하기 | c_insert_row_col_list | insert_lower_row | Ctrl+Enter |
| 표/줄/칸 추가하기 | 왼쪽에 칸 추가하기 | c_insert_row_col_list | insert_left_col | Alt+Insert |
| 표/줄/칸 추가하기 | 오른쪽에 칸 추가하기 | c_insert_row_col_list | insert_right_col |  |
| 표 | 줄/칸 지우기 |  |  |  |
| 표/줄/칸 지우기 | 줄 지우기 | c_remove_row_col_list | remove_row | Ctrl+BackSpace |
| 표/줄/칸 지우기 | 칸 지우기 | c_remove_row_col_list | remove_col | Alt+Delete |
| 표 | 셀 나누기... | dialog_split_cell |  | S |
| 표 | 셀 합치기 | c_merge |  | M |
| 표 | 셀 높이를 같게 | c_height_distribute |  | H |
| 표 | 셀 너비를 같게 | c_width_distribute |  | W |
| 표 | 블록 계산식 |  |  |  |
| 표/블록 계산식 | 블록 합계 | c_cell_calc_sum |  | Ctrl+Shift+S |
| 표/블록 계산식 | 블록 평균 | c_cell_calc_average |  | Ctrl+Shift+A |
| 표/블록 계산식 | 블록 곱 | c_cell_calc_multiplication |  | Ctrl+Shift+P |
| 표 | 1,000 단위 구분 쉼표 |  |  |  |
| 표/1,000 단위 구분 쉼표 | 자릿점 넣기 | c_cell_insert_sep |  |  |
| 표/1,000 단위 구분 쉼표 | 자릿점 빼기 | c_cell_remove_sep |  |  |

## 검토

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 검토 | 변경 내용 추적 |  |  |  |
| 검토/변경 내용 추적 | 변경 내용 추적 | trackchange_on |  |  |
| 검토/변경 내용 추적 | 적용 후 다음으로 이동 | trackchange_apply_next |  |  |
| 검토/변경 내용 추적 | 취소 후 다음으로 이동 | trackchange_cancel_next |  |  |
| 검토/변경 내용 추적 | 다음 | trackchange_next |  |  |
| 검토/변경 내용 추적 | 이전 | trackchange_prev |  |  |
| 검토/변경 내용 추적 | 변경 내용 보기 |  |  |  |
| 검토/변경 내용 추적/변경 내용 보기 | 삽입 및 삭제 | trackchange_view_insert_delete |  |  |
| 검토/변경 내용 추적/변경 내용 보기 | 서식 | trackchange_view_shape |  |  |
| 검토/변경 내용 추적 | 최종본 및 변경 내용 | trackchange_final_info |  |  |
| 검토/변경 내용 추적 | 최종본 | trackchange_final |  |  |

## 도구

| 경로 | 항목 | 명령 또는 UI 대상 | 값 | 웹 표시 키 |
|---|---|---|---|---|
| 도구 | 빠른 교정 |  |  |  |
| 도구/빠른 교정 | '곧은 따옴표'를 '둥근 따옴표'로 자동 바꾸기 | qCorrectQuote |  |  |
| 도구 | 접근성 설정 |  |  |  |
| 도구/접근성 설정 | 스크린 리더 지원 사용 | accessibility |  | Ctrl+Alt+F1 |
| 도구 | 채팅 | g_chat |  |  |

## 상태와 문맥

메뉴를 열 때 활성 상태가 갱신된다. 예를 들어 편집 용지는 초기 숨겨진 DOM에서는 비활성으로 보였지만 실제 메뉴를 열면 사용할 수 있었다. 선택 상태를 확인하지 않고 항목을 영구 비활성으로 구현하지 않는다. 표 내부 Ctrl+Enter와 본문 Ctrl+Enter는 문맥을 나눠야 한다. P·S·M·H·W 같은 한 글자 키를 일반 글 입력 중에 전역 처리하지 않는다.

## 도구 모음 관찰

- 제목 영역: 이름 바꾸기, 단축키 가이드, 도움말, 한글 정보. 단축키 가이드는 별도 공식 도움말 탭을 연다.
- 기본 도구 상자: 저장, 오려 두기, 복사, 붙이기, 모양 복사, 찾기·바꾸기·찾아가기, 도형·그림·표·차트·웹 동영상, 각주·미주, 하이퍼링크·문자표, 글자·문단·개체 속성, 머리말·꼬리말, 조판·문단 부호, 격자, 공공안심글꼴.
- 서식 도구 상자: 실행 취소·다시 실행, 글꼴·크기 입력 계열, 진하게·기울임·밑줄·취소선, 양쪽·왼쪽·가운데·오른쪽·배분·나눔 정렬, 목록 및 수준 변경. 밑줄과 취소선의 여러 선 모양 선택지가 존재한다.
- 상태 표시줄: 쪽 윤곽, 폭 맞춤, 쪽 맞춤, 축소·확대.
- 작업 창: 접기·펼치기와 차트 데이터 편집·행/열 전환·유형·레이블·범례·격자선 관련 항목이 DOM에 존재한다. 실제 차트 선택 상태에서의 동작은 미검증이다.
- 우클릭 정의: 텍스트·표·개체·그림·링크·필드·책갈피·머리말/꼬리말·메모·변경 추적·차트 관련 명령이 포함된다. 모든 선택 상태를 실제로 재현한 것은 아니다.

모든 정적 정의의 상하 관계는 [ui-definitions.json](ui-definitions.json), 참조를 따라 확장한 대화상자는 [dialogs.json](dialogs.json)을 참조한다. 공통 정의와 HWP 전용 정의의 합집합에는 실제 화면에서 숨겨지는 항목도 있다.

