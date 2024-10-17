// components/Timeline.tsx
"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import AuthModal from "./AuthModal";

// タイムラインのデータ型を定義
type Experience = {
  id: string;
  title: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  link: string;
};

export default function Timeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState({
    title: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    link: "",
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<"add" | "delete" | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Firestoreからデータを取得
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "experiences"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Experience[];
      setExperiences(data);
    };

    fetchData();
  }, []);

  // 新しい経験を追加する関数
  const addExperience = async () => {
    try {
      console.log("新しい経験を追加");
      const docRef = await addDoc(collection(db, "experiences"), newExperience);
      setExperiences([...experiences, { id: docRef.id, ...newExperience }]);
      setNewExperience({
        title: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        link: "",
      });
    } catch (error) {
      console.error("追加中にエラーが発生しました:", error);
    }
  };

  // 経験を削除する関数
  const deleteExperience = async (id: string) => {
    try {
      console.log("削除開始: ID =", id);
      await deleteDoc(doc(db, "experiences", id));
      console.log("削除成功: ID =", id);
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
    }
  };

  // 認証後にアクションを実行
  const handleAuthSuccess = () => {
    if (authAction === "add") {
      addExperience();
    } else if (authAction === "delete" && targetId) {
      deleteExperience(targetId);
    }
    // 認証と処理が成功した後に状態をクリアする
    setAuthAction(null);
    setTargetId(null);
    setShowAuthModal(false);
  };

  return (
    <div>
      {showAuthModal && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => {
            setShowAuthModal(false);
            setAuthAction(null);
            setTargetId(null);
          }}
        />
      )}

      <div className="timeline relative border-l border-gray-300 pl-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item mb-8">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full -ml-1.5 mr-4"></div>
              <h3 className="text-xl font-semibold">
                {exp.link ? (
                  <Link href={exp.link} legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700"
                    >
                      {exp.title}
                    </a>
                  </Link>
                ) : (
                  exp.title
                )}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              {exp.position} | {exp.startDate} - {exp.endDate}
            </p>
            <p className="text-base text-gray-700">{exp.description}</p>
            <button
              onClick={() => {
                console.log("削除ボタンが押されました。対象ID:", exp.id);
                setAuthAction("delete");
                setTargetId(exp.id);
                setShowAuthModal(true); // 削除時に認証を求める
              }}
              className="text-red-500"
            >
              削除
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {showForm ? "フォームを閉じる" : "新しい経験を追加"}
        </button>
        {showForm && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">新しい経験を追加</h3>
            <input
              type="text"
              placeholder="タイトル"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="ポジション"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="開始日"
              value={newExperience.startDate}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  startDate: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="終了日"
              value={newExperience.endDate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, endDate: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="リンク"
              value={newExperience.link}
              onChange={(e) =>
                setNewExperience({ ...newExperience, link: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="説明"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={() => {
                console.log("追加ボタンが押されました");
                setAuthAction("add");
                setShowAuthModal(true); // 追加時に認証を求める
              }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
