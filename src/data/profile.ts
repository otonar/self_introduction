export const profile = {
  name: "鈴木 蒼叶",
  nameEn: "Aoto Suzuki",
  role: "Student / Engineer",
  tagline: "当たり前に埋もれた不便を技術で変えたい",
  bio: `はじめまして，鈴木蒼叶（すずき あおと）です．山梨大学でコンピュータサイエンスを学んでいます．
Web アプリケーション開発を中心に，バックエンドからフロントエンドまで幅広く取り組んでいます．
「当たり前に埋もれた不便を技術で変える」をモットーに，プロダクトを個人・チームで開発しています．`,

  education: {
    school: "山梨大学",
    faculty: "工学部",
    department: "コンピュータ理工学科",
    graduation: "2028年3月卒業予定",
  },

  skills: [
    "Python",
    "C++",
    "Django",
    "Git",
  ],

  seeking: {
    types: ["バックエンドエンジニア", "フルスタックエンジニア", "プロダクトマネージャー", "プロダクトエンジニア", "Webエンジニア"],
    interests: ["Web アプリケーション開発", "プロダクト開発", "AI・機械学習応用", "iOS アプリ開発", "組み込みシステム開発"],
    workStyle: "フルタイム（2028年4月〜）",
  },

  strengths: [
    {
      title: "手を動かして学ぶ姿勢",
      description: "プログラミングを始めて2年,複数のWebアプリを個人開発。技術は実際に作りながら習得してきました。",
    },
    {
      title: "課題発見からプロダクト化まで",
      description: "「カップルの割り勘が面倒」「議論の質が人気に左右される」など日常の課題をプロダクトとして形にしています。",
    },
    {
      title: "幅広い技術スタックへの対応",
      description: "フロントエンド（Next.js）・バックエンド（Django / Hono）・インフラ（Docker / Cloudflare Workers）まで一人で担当できます。",
    },
  ],

  certifications: [] as Array<{ name: string; year: string }>,

  experience: [] as Array<{
    role: string;
    org: string;
    period: string;
    desc?: string;
  }>,

  location: "Yamanashi, Japan",
  available: true,
  sns: [
    { name: "GitHub", url: "https://github.com/otonar", handle: "@otonar" },
    { name: "Twitter / X", url: "https://X.com/otos_78", handle: "@otos_78" },
    { name: "Qiita", url: "https://qiita.com/otonar", handle: "@otonar" },
    { name: "Instagram", url: "https://instagram.com/in/a_oto.0115", handle: "Aoto_Suzuki" },
  ],
  email: "t23cs028@gmail.com",
};
