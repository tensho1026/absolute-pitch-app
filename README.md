# 🎹 音感ラボ- Master Your Absolute Pitch


**音感ラボ**は、楽しみながら絶対音感を鍛えることができるWebアプリです。

🚀 デプロイ URL: https://absolute-pitch-ten.vercel.app/


![image](https://github.com/user-attachments/assets/9f8d362b-7987-4901-9b6e-8cfeb7391d41)


## 🧩 主な機能

| 機能名 | 説明 |
|--------|------|
| 🎹 ピアノ演奏ページ | 仮想キーボードで自由に演奏できます |
| 🎯 絶対音感クイズ練習ページ | 音を聴いて音名を当てる練習ができます |
| 🔥 チャレンジモード | ランダムに出題される音を答えてスコア獲得できます |
| 🏆 スコアランキング | 他のユーザーとスコアを比較できます |
| 📊 自己分析ページ | 正解・不正解の傾向を確認できます |

---

## 🛠️ 使用技術スタック

- **フレームワーク**：Next.js, TypeScript  
- **スタイリング**：Tailwind CSS, shadcn/ui  
- **認証**：Clerk  
- **データベース**：Supabase  
- **音声処理**：Tone.js  
- **グラフ描画**：Recharts  
- **アニメーション・UI補助**：  
  framer-motion, lucide-react, react-hot-toast, react-icons


## 🗂 各ページの紹介

### 🎹 Play Piano  
自由に仮想キーボードを演奏できるページです。音を確かめたり、自主練習に使ったり、耳を慣らすための基礎トレーニングに活用できます。
![image](https://github.com/user-attachments/assets/f66c2019-4256-4ef6-9374-150b9863baf0)

### 🔥 Challenge  
ランダムに鳴る音を聴き取って答えるクイズ形式のモードです。正答数に応じてスコアが決まり、集中力と音感が試されます。
![image](https://github.com/user-attachments/assets/25cd3d11-fedc-49c1-b1c2-5c77cf282656)

### 🏆 Ranking  
チャレンジモードで獲得したスコアのランキングが表示されます。他のユーザーと自分の成績を比較して、モチベーションを維持できます。
![image](https://github.com/user-attachments/assets/9167e887-1836-456b-a6ea-511d21e35c2a)


### 📊 My Data  
自分がこれまでチャレンジしたクイズの記録を確認できます。正解・不正解の傾向をグラフで視覚的に把握し、得意な音・苦手な音を分析できます。
![image](https://github.com/user-attachments/assets/b3d7886a-3340-41dd-b7d2-392ea0977536)

### 🧪 Tech Info（技術紹介ページ）  
このアプリで使われている技術スタックや、技術選定理由をまとめた技術紹介ページです。開発者や技術に興味のある方向け。
![image](https://github.com/user-attachments/assets/64127fd5-2103-427f-b95d-fd22a7042d50)


---

## 🚀 デプロイ先
- **Vercel** にてホスティング

## 🎯 対象ユーザー

- <span style="color:#e63946;"><strong>音楽が好きな方！</strong></span>
- 音感を鍛えたい音楽初心者・中級者
- 音楽教育を行っている先生や指導者
- 絶対音感に興味のあるすべての方

## 💻 利用環境について

本アプリはPCでの使用を前提に設計されています。  
演奏体験や操作性を重視しているため、スマートフォンやタブレットなどのモバイル端末には対応していません。  
今後のアップデートでモバイル対応も検討予定です。

## 🛠 今後のアップデート予定

- モバイル対応（レスポンシブ対応）
- チャレンジモードの難易度選択追加
- 実力に応じた「音感級・音感段」制度の実装（例：初級〜1級、1段〜5段など）
- 練習履歴グラフの可視化
