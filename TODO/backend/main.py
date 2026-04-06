from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ゲーム状態
game = {
    "score": 0,

    # クリック
    "per_click": 1,
    "click_cost": 20,

    # 自動収入
    "auto1_count": 0,
    "auto1_power": 1,
    "auto1_cost": 10,

    # 自動収入
    "auto2_count": 0,
    "auto2_power": 2,
    "auto2_cost": 50,

    # 自動収入
    "auto3_count": 0,
    "auto3_power": 3,
    "auto3_cost": 100
}

# 状態取得
@app.get("/game")
def get_game():
    return game

# クリック
@app.post("/click")
def click():
    game["score"] += game["per_click"]
    return game

# 毎秒処理
@app.post("/tick")
def tick():
    total_per_second = (
        game["auto1_count"] * game["auto1_power"] +
        game["auto2_count"] * game["auto2_power"] +
        game["auto3_count"] * game["auto3_power"]
    )
    game["score"] += total_per_second
    return game

# クリック強化
@app.post("/upgrade_click")
def upgrade_click():
    if game["score"] >= game["click_cost"]:
        game["score"] -= game["click_cost"]
        game["per_click"] += 1
        game["click_cost"] = int(game["click_cost"] * 1.8)
    return game

# 自動収入
@app.post("/buy_auto1")
def buy_auto1():
    if game["score"] >= game["auto1_cost"]:
        game["score"] -= game["auto1_cost"]
        game["auto1_count"] += 1
        game["auto1_cost"] = int(game["auto1_cost"] * 1.5)
    return game

# 自動収入
@app.post("/buy_auto2")
def buy_auto2():
    if game["score"] >= game["auto2_cost"]:
        game["score"] -= game["auto2_cost"]
        game["auto2_count"] += 1
        game["auto2_cost"] = int(game["auto2_cost"] * 2)
    return game

# 自動収入
@app.post("/buy_auto3")
def buy_auto3():
    if game["score"] >= game["auto3_cost"]:
        game["score"] -= game["auto3_cost"]
        game["auto3_count"] += 1
        game["auto3_cost"] = int(game["auto3_cost"] * 2)
    return game