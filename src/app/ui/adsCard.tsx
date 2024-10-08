"use client";
import React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export type Props = React.ComponentProps<"div">;

type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};

declare global {
  var admaxads: AdmaxAdType[];
}

export const AdsCard = (props: Props) => {
  const adMaxId = "73f9b3532b8286335b8153be8c3f4672";
  // 親コンポーネントでスタイルを設定できるようにする
  const { className, children, ...newProps } = props;

  const pathname = usePathname();

  useEffect(() => {
    // 広告配信用のタグを挿入する
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";

    tag.async = true;
    document.body.appendChild(tag);

    try {
      (globalThis.admaxads = window.admaxads || []).push({
        admax_id: adMaxId,
        type: "banner",
      });
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);

  // スタイルはTailwindを使うことを前提としている
  return (
    <div
      className="admax-ads"
      key={pathname}
      style={{ display: "inline-block;" }}
      data-admax-id={adMaxId}
      {...newProps}
    ></div>
  );
};
