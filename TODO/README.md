# TODO

FastAPI + React (Create React App) で作られた、シンプルな TODO アプリです。  
フロントエンドからバックエンド API を呼び出し、タスクの一覧取得・追加・削除を行います。

## どんなプログラムか

- タスクを入力して追加できる
- タスク一覧を表示できる
- タスクを削除できる
- データ保存は現状メモリ上（サーバ再起動で消える）

## 使用技術

- Backend: Python, FastAPI, Uvicorn, CORS Middleware
- Frontend: React, Create React App, fetch API
- 開発環境: Node.js / npm, Python venv

## ディレクトリ構成

```text
TODO/
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

- `GET /todos` : TODO 一覧取得
- `POST /todos` : TODO 追加
- `DELETE /todos/{index}` : TODO 削除

## 備考

- 永続化（DB保存）は未実装です。必要なら SQLite や PostgreSQL へ拡張できます。
- 本リポジトリでは `venv/` や `node_modules/` は `.gitignore` で除外してください。
