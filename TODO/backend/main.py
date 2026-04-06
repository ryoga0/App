from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS設定（Reactと通信するため）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 仮のデータ保存（DBの代わり）
todos = []

# 一覧取得
@app.get("/todos")
def get_todos():
    return todos

# 追加
@app.post("/todos")
def add_todo(todo: dict):
    todos.append(todo)
    return {"message": "added"}

# 削除
@app.delete("/todos/{index}")
def delete_todo(index: int):
    if 0 <= index < len(todos):
        todos.pop(index)
    return {"message": "deleted"}