# Hono Lambda Sample

「Hono が実現する直感的な AWS Lambda アプリケーション開発」のサンプルプロジェクトです。スライドは[こちら](https://jomatsu.me/decks/hono-lambda)

## 🚀 プロジェクト概要

### スライドとの対応

- **直感的なAPI開発**: Honoの軽量でシンプルなAPI設計 (`lambda/app.ts`)
- **開発体験の向上**: ローカル開発サーバーとホットリロード対応
- **AWS統合**: CDK を使用したインフラ構築と Lambda 関数の自動デプロイ
- **TypeScript型安全性**: @hono/zod-openapi による型安全なAPI定義
- **API仕様書の自動生成**: Scalar UI によるインタラクティブなAPI仕様書

## 🛠️ 技術スタック

- **Framework**: [Hono](https://hono.dev/) - 軽量でエッジランタイム対応のWebフレームワーク
- **Runtime**: AWS Lambda (Node.js 22.x)
- **Infrastructure**: AWS CDK
- **Validation**: Zod + OpenAPI 3.0
- **Documentation**: Scalar API Reference
- **Language**: TypeScript

## 📁 プロジェクト構造

```
├── lambda/
│   ├── app.ts          # Honoアプリケーション本体（スライドの主要コード）
│   ├── handler.ts      # AWS Lambda用ハンドラー
│   ├── index.ts        # ローカル開発用サーバー
│   └── client.mts      # クライアント用型定義（Hono Client のデモ）
├── lib/
│   └── hono-lambda-sample-stack.ts  # CDKインフラ定義
├── test/
│   └── hono-lambda-sample.test.ts   # テストファイル
└── bin/
    └── hono-lambda-sample.js        # CDKアプリエントリーポイント
```

## 🚀 クイックスタート

### 1. 依存関係のインストール
```bash
npm install
```

### 2. ローカル開発
```bash
npm run dev
```
http://localhost:3000 でアプリケーションが起動します（@hono/node-server によるローカル開発サーバー）

### 3. API仕様書の確認
- Swagger UI: http://localhost:3000/scalar
- OpenAPI JSON: http://localhost:3000/doc

### 4. AWS環境へのデプロイ（@hono/aws-lambda によるハンドラー化）
```bash
# CDKの初期設定（初回のみ）
npx cdk bootstrap

# デプロイ
npx cdk deploy
```

## 🔧 利用可能なコマンド

### 開発・ビルド
* `npm run dev`     - ローカル開発サーバー起動（ホットリロード対応）
* `npm run build`   - TypeScriptコンパイル
* `npm run watch`   - ファイル監視モードでコンパイル

### AWS CDK
* `npx cdk deploy`  - AWSにスタックをデプロイ
* `npx cdk diff`    - 現在のスタックとの差分表示
* `npx cdk synth`   - CloudFormationテンプレート生成
* `npx cdk destroy` - スタックの削除