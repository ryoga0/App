# game

FastAPI + React (Create React App) で作られた、クリッカーゲームです。  
クリックでスコアを増やし、強化や自動収入を購入して効率を上げる構成になっています。

## どんなプログラムか

- クリックでスコア獲得
- クリック強化（1クリックあたりの獲得量アップ）
- 自動収入の購入（毎秒スコア増加）
- 一定条件で上位自動収入を解放
- ゲーム状態は現状メモリ上（サーバ再起動でリセット）

## 使用技術

- Backend: Python, FastAPI, Uvicorn, CORS Middleware
- Frontend: React, Create React App, fetch API
- 開発環境: Node.js / npm, Python venv

## ディレクトリ構成

```text
game/
├─ backend/
│  ├─ main.py
│  └─ venv/                  # ローカル仮想環境（Git管理しない）
└─ frontend/
   └─ my-app/
      ├─ src/
      │  └─ App.js
      ├─ package.json
      └─ ...
```

## 環境構築

### 1. Backend (FastAPI)

`backend/` で実行:

```bash
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn
```

### 2. Frontend (React)

`frontend/my-app/` で実行:

```bash
npm install
```

## 起動方法

### 1. Backend 起動

`backend/` で実行:

```bash
venv\Scripts\activate
uvicorn main:app --reload
```

API は `http://127.0.0.1:8000` で起動します。

### 2. Frontend 起動

`frontend/my-app/` で実行:

```bash
npm start
```

ブラウザで `http://localhost:3000` を開きます。

## API エンドポイント

- `GET /game` : 現在のゲーム状態を取得
- `POST /click` : クリック実行
- `POST /tick` : 毎秒処理を実行
- `POST /upgrade_click` : クリック強化を購入
- `POST /buy_auto1` : 自動収入1を購入
- `POST /buy_auto2` : 自動収入2を購入
- `POST /buy_auto3` : 自動収入3を購入

## 備考

- 永続化（DB保存）は未実装です。必要ならセーブ API + DB を追加してください。
- 本リポジトリでは `venv/` や `node_modules/` は `.gitignore` で除外してください。
