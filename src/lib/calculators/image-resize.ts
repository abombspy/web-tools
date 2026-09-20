// 원본 비율을 유지하면서 최대 가로/세로 안에 들어가도록 축소 크기를 계산한다.
// 실제 인코딩(압축·포맷 변환)은 브라우저 Canvas API가 담당하므로(단위 테스트 불가 영역),
// 이 파일은 순수하게 테스트 가능한 크기 계산 로직만 분리했다. plan.md §4.7 "이미지 압축·
// 리사이즈·포맷 변환".
export type Dimensions = { width: number; height: number };

export function calculateResizeDimensions(
  original: Dimensions,
  maxWidth: number,
  maxHeight: number,
): Dimensions {
  if (original.width <= maxWidth && original.height <= maxHeight) {
    // 원본이 이미 한도 안에 있으면 확대하지 않는다.
    return original;
  }

  const widthRatio = maxWidth / original.width;
  const heightRatio = maxHeight / original.height;
  const ratio = Math.min(widthRatio, heightRatio);

  return {
    width: Math.round(original.width * ratio),
    height: Math.round(original.height * ratio),
  };
}
