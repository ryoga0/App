import { useEffect, useState } from "react";

function App() {
  const [game, setGame] = useState({
    score: 0,
    per_click: 1,
    click_cost: 20,
    auto1_count: 0,
    auto1_power: 1,
    auto1_cost: 10,
    auto2_count: 0,
    auto2_power: 2,
    auto2_cost: 50,
    auto3_count: 0,
    auto3_power: 3,
    auto3_cost: 100,
  });

  // 自動収入3 解放済みかどうか
  const [auto3Unlocked, setAuto3Unlocked] = useState(false);

  // 一度でも 50 以上になったら解放フラグを立てる
  useEffect(() => {
    if (!auto3Unlocked && game.score >= 50) {
      setAuto3Unlocked(true);
    }
  }, [game.score, auto3Unlocked]);

  // 状態取得
  const fetchGame = async () => {
    const res = await fetch("http://127.0.0.1:8000/game");
    const data = await res.json();
    setGame(data);
  };

  useEffect(() => {
    fetchGame();

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // クリック
  const click = async () => {
    const res = await fetch("http://127.0.0.1:8000/click", {
      method: "POST",
    });
    setGame(await res.json());
  };

  // 毎秒処理
  const tick = async () => {
    const res = await fetch("http://127.0.0.1:8000/tick", {
      method: "POST",
    });
    setGame(await res.json());
  };

  // 購入系
  const upgradeClick = async () => {
    const res = await fetch("http://127.0.0.1:8000/upgrade_click", {
      method: "POST",
    });
    setGame(await res.json());
  };

  const buyAuto1 = async () => {
    const res = await fetch("http://127.0.0.1:8000/buy_auto1", {
      method: "POST",
    });
    setGame(await res.json());
  };

  const buyAuto2 = async () => {
    const res = await fetch("http://127.0.0.1:8000/buy_auto2", {
      method: "POST",
    });
    setGame(await res.json());
  };

  const buyAuto3 = async () => {
    const res = await fetch("http://127.0.0.1:8000/buy_auto3", {
      method: "POST",
    });
    setGame(await res.json());
  };

  // 毎秒計算（表示用）
  const perSecond =
    game.auto1_count * game.auto1_power +
    game.auto2_count * game.auto2_power +
    game.auto3_count * game.auto3_power;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>クリッカーゲーム</h1>

      <h2>スコア: {game.score}</h2>
      <p>クリック: +{game.per_click}</p>
      <p>毎秒: +{perSecond}</p>

      <button
        onClick={click}
        style={{ fontSize: "24px", padding: "20px" }}
      >
        クリック！
      </button>

      <hr />

      <h3>ショップ</h3>

      {/* クリック強化 */}
      <button onClick={upgradeClick}>
        クリック強化 (+1) - {game.click_cost}
      </button>

      <br />

      {/* 自動 */}
      <button onClick={buyAuto1}>
        自動収入1 (+1/秒) - {game.auto1_cost}
      </button>

      <br />

      {/* 自動 */}
      {game.score >= 0 && (
        <button onClick={buyAuto2}>
          自動収入2 (+2/秒) - {game.auto2_cost}
        </button>
      )}

      <br />

      {/* 自動（解放条件あり） */}
      {auto3Unlocked && (
          <button onClick={buyAuto3}>
          自動収入3 (+3/秒) - {game.auto3_cost}
        </button>
      )}
    </div>
  );
}

export default App;