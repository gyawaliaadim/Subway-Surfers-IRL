"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import axios from "axios";
import { useUserData } from "@/context/userData";

export default function Screen2() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const userData = useUserData();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (isCameraOpen) {
      const start = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera error", err);
          setError("Unable to access camera");
          setIsCameraOpen(false);
        }
      };
      start();
    } else {
      // ensure camera is stopped when not open
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
    // cleanup when unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isCameraOpen]);

  const validate = (n, a) => {
    if (
      a &&
      n &&
      a > 0 &&
      a < 120 &&
      n.length > 3 &&
      n.split(" ").length < 4 &&
      n.split(" ").length >= 2
    ) {
      setError("");
      return true;
    } else {
      setError("Please enter valid name and age");
      return false;
    }
  };

  const onSubmit = async () => {
    let trimmedName = name.trim();
    let validName = trimmedName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");

    const ageNum = Number(age);
    const validated = validate(validName, ageNum);
    if (!validated) return;

    setName(validName);

    try {
      if (userData?.id) {
        // user already exists, update name/age and continue
        await axios.put('/api/userData', { id: userData.id, name: validName, age: ageNum });
        userData.setName(validName);
        userData.setAge(ageNum);
        router.push('/screen3');
        return;
      }

      const res = await axios.post('/api/userData', { name: validName, age: ageNum });
      if (res.status === 200 && res.data && res.data.id) {
        userData.setName(validName);
        userData.setAge(ageNum);
        userData.setId(res.data.id);
        router.push('/screen3');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit data. Please try again.');
    }
  };

  // capture currently displayed video frame to dataURL
  const captureFrame = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhoto(dataUrl);
    // stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const savePhoto = async () => {
    if (!capturedPhoto) return;
    if (!name || !age) {
      setError('Enter name and age before saving photo');
      return;
    }
    setUploadingPhoto(true);
    try {
      if (userData?.id) {
        await axios.put('/api/userData', { id: userData.id, photo: capturedPhoto });
        setIsPhotoSaved(true);
      } else {
        const res = await axios.post('/api/userData', { name, age: Number(age), photo: capturedPhoto });
        if (res.status === 200 && res.data && res.data.id) {
          userData.setName(name);
          userData.setAge(Number(age));
          userData.setId(res.data.id);
          setIsPhotoSaved(true);
        }
      }
    } catch (err) {
      console.error('Failed saving photo', err);
      setError('Failed to save photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <Model>

      <div className="flex justify-center flex-col items-center gap-6">
        <h2 style={{ fontSize: "2.5rem" }}>Tell us about you 😊</h2>

        {/* Camera icon / preview area */}
        <div className="relative">
          {!isCameraOpen && !capturedPhoto && (
            <div
              onClick={() => setIsCameraOpen(true)}
              className="p-10 cursor-pointer hover:bg-gray-600 duration-300 transition-all rounded-full bg-gray-400 w-min h-min text-3xl"
            >
              📷
            </div>
          )}

          <div className="mt-4">
            {isCameraOpen && !capturedPhoto && (
              <div className="flex flex-col items-center gap-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-64 h-64 rounded-lg bg-black object-cover"
                />
                <div className="flex gap-3">
                  <button onClick={captureFrame} className="px-4 py-2 bg-green-500 text-white rounded">Capture</button>
                  <button onClick={() => setIsCameraOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
              </div>
            )}

            {capturedPhoto && (
              <div className="flex flex-col items-center gap-3">
                <img src={capturedPhoto} alt="captured" className="w-64 h-64 object-cover rounded-lg" />
                <div className="flex gap-3">
                  {!isPhotoSaved ? (
                    <button onClick={savePhoto} className="px-4 py-2 bg-blue-600 text-white rounded">{uploadingPhoto ? 'Saving...' : 'Save Photo'}</button>
                  ) : (
                    <button onClick={() => { setCapturedPhoto(null); setIsPhotoSaved(false); setTimeout(() => setIsCameraOpen(true), 50); }} className="px-4 py-2 bg-yellow-400 text-black rounded">Retake</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>

          <input
            className="input"
            type="text"
            placeholder="Your full Name (eg Ram Kumar)"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Your Age (eg 20)"
            value={age}
            onChange={e => setAge(e.target.value.trim())}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="px-6 py-6 rounded-2xl hover:bg-yellow-500 cursor-pointer bg-yellow-400 text-black font-bold text-2xl disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => onSubmit()}
          disabled={!name || !age}
        >
          Let's Play ▶️
        </button>
      </div>
    </Model>
  );
}
