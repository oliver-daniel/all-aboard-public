import Script from "next/script";

type Props = {
  gtmId: string;
};
export const GoogleAnalytics = ({ gtmId }: Props) => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());

         gtag('config', '${gtmId}');
        `}
    </Script>
  </>
);
