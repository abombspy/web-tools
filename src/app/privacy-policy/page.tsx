import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-zinc-500">시행일: [YYYY-MM-DD] (TODO: 실제 게시일로 수정)</p>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          {SITE_NAME}(이하 &ldquo;사이트&rdquo;)는 이용자의 개인정보를 중요하게 생각하며,
          「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 사이트가 제공하는 계산기
          서비스 이용 시 적용됩니다.
        </p>

        <h2>1. 수집하는 개인정보 항목</h2>
        <p>
          사이트의 계산기는 이용자가 입력한 값(시급, 근무시간, 소득 금액 등)을 <strong>서버로
          전송하거나 저장하지 않고</strong>, 이용자의 브라우저 안에서만 계산해 화면에 표시합니다.
          사이트는 회원가입을 요구하지 않으며, 이름·이메일 등 개인 식별 정보를 직접 수집하지
          않습니다.
        </p>

        <h2>2. 쿠키(Cookie) 및 광고·분석 도구</h2>
        <p>
          사이트는 광고 게재(Google AdSense) 및 이용 현황 분석을 위해 쿠키를 사용할 수 있습니다.
          Google 등 제3자 광고 서비스 제공자는 이용자의 관심사에 기반한 광고를 게재하기 위해
          쿠키를 사용할 수 있으며, 이용자는{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google 광고 설정
          </a>
          에서 맞춤 광고를 거부할 수 있습니다. (TODO: 실제 도입하는 분석 도구가 정해지면 이름과
          쿠키 목록을 구체적으로 명시)
        </p>

        <h2>3. 개인정보의 보유 및 이용기간</h2>
        <p>
          위와 같이 사이트는 입력값을 서버에 저장하지 않으므로, 별도로 보유·이용하는 개인정보가
          없습니다. 광고·분석 도구가 자체적으로 수집하는 정보는 각 제공자의 정책을 따릅니다.
        </p>

        <h2>4. 개인정보 처리 위탁</h2>
        <p>
          사이트는 광고 게재를 위해 Google AdSense에 광고 관련 데이터 처리를 위탁하고 있습니다.
          (TODO: 향후 분석 도구, 서버 호스팅 등 위탁 업체가 추가되면 이 목록에 반영)
        </p>

        <h2>5. 이용자의 권리</h2>
        <p>
          사이트가 별도로 개인정보를 저장하지 않으므로 열람·정정·삭제를 요청할 개인정보 자체가
          없습니다. 광고 개인화와 관련한 권리 행사는 위 Google 광고 설정 페이지를 이용해 주세요.
        </p>

        <h2>6. 개인정보 보호책임자</h2>
        <p>
          문의사항은 아래 연락처로 접수해 주시기 바랍니다.
          <br />
          이메일: {CONTACT_EMAIL}
        </p>

        <h2>7. 고지의 의무</h2>
        <p>
          본 방침은 법령·정책 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 이 페이지를 통해
          공지합니다.
        </p>
      </div>
    </div>
  );
}
