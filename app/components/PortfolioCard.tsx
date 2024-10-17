"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../lib/firebase";
import AuthModal from "./AuthModal";

// プロジェクトデータ型を定義
type Project = {
  id: string;
  title: string;
  photoUrl: string;
  link: string;
  technologies: string;
  description: string;
  githubLink: string;
};

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project | Omit<Project, "id">>({
    title: "",
    photoUrl: "",
    link: "",
    technologies: "",
    description: "",
    githubLink: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<"add" | "delete" | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);

  // Firestoreからデータを取得
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "mysites"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(data);
    };

    fetchData();
  }, []);

  // 新しいプロジェクトを追加する関数
  const addProject = async () => {
    try {
      let photoUrl = newProject.photoUrl;
      if (selectedImage) {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        photoUrl = await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, "mysites"), {
        ...newProject,
        photoUrl,
      });
      setProjects([...projects, { id: docRef.id, ...newProject, photoUrl }]);
      setNewProject({
        title: "",
        photoUrl: "",
        link: "",
        technologies: "",
        description: "",
        githubLink: "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("追加中にエラーが発生しました:", error);
    }
  };

  // プロジェクトを削除する関数
  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "mysites", id));
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
    }
  };

  // 認証後にアクションを実行
  const handleAuthSuccess = () => {
    if (authAction === "add") {
      addProject();
    } else if (authAction === "delete" && targetId) {
      deleteProject(targetId);
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card bg-white shadow-md rounded-md p-4"
          >
            <h3 className="font-bold mb-2">{project.title}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img
                src={project.photoUrl}
                alt={`${project.title} image`}
                className="mb-2 max-w-full max-h-64 object-cover cursor-pointer"
              />
            </a>
            <p className="mb-2">{project.description}</p>
            <p className="mb-2">Technologies used: {project.technologies}</p>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on GitHub
            </a>
            <div className="flex mt-4">
              <button
                onClick={() => {
                  setAuthAction("delete");
                  setTargetId(project.id);
                  setShowAuthModal(true);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {showForm ? "フォームを閉じる" : "新しいプロジェクトを追加"}
        </button>
        {showForm && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">新しいプロジェクトを追加</h3>
            <input
              type="text"
              placeholder="タイトル"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="リンク"
              value={newProject.link}
              onChange={(e) =>
                setNewProject({ ...newProject, link: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="使用技術"
              value={newProject.technologies}
              onChange={(e) =>
                setNewProject({ ...newProject, technologies: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="説明"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="GitHubリンク"
              value={newProject.githubLink}
              onChange={(e) =>
                setNewProject({ ...newProject, githubLink: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={() => {
                setAuthAction("add");
                setShowAuthModal(true);
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
