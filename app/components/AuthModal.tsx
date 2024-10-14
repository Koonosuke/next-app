// components/AuthModal.tsx
"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebase";

type AuthModalProps = {
  onSuccess: () => void; // 認証成功時のコールバック
  onClose: () => void; // モーダルを閉じるためのコールバック
};

export default function AuthModal({ onSuccess, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("ログイン成功:", userCredential.user);
      onSuccess(); // 認証成功時に追加や削除の操作を実行する
      onClose(); // モーダルを閉じる
    } catch (err) {
      console.error("認証に失敗しました:", err);
      setError("認証に失敗しました。正しいIDとパスワードを入力してください。");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-6">認証が必要です</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 mb-4 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 mb-6 w-full rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ログイン
          </button>
          <button onClick={onClose} className="text-red-500">
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
