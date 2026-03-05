import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function AttendanceMarker() {
  const { token } = useAuth();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      setIsCapturing(false);
    }
  }, [webcamRef]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  const handleSubmit = async (type: "check-in" | "check-out") => {
    if (!imgSrc || !location) {
      alert("Please capture selfie and location first");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          selfie_url: imgSrc, // In real app, upload to storage first
          lat: location.lat,
          lng: location.lng,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
        setImgSrc(null);
        setLocation(null);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckCircle2 className="text-primary w-6 h-6" />
        Mark Attendance
      </h2>

      <div className="space-y-4">
        {/* Camera Section */}
        <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-200">
          {isCapturing ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                disablePictureInPicture={true}
                forceScreenshotSourceSize={false}
                imageSmoothing={true}
                mirrored={false}
                onUserMedia={() => {}}
                onUserMediaError={() => {}}
                onScreenshot={() => {}}
                videoConstraints={{ facingMode: "user" }}
                screenshotQuality={0.92}
              />
              <button
                onClick={capture}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
              >
                <Camera className="w-6 h-6" />
              </button>
            </>
          ) : imgSrc ? (
            <img src={imgSrc} alt="Selfie" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Camera className="w-12 h-12 mb-2" />
              <button
                onClick={() => setIsCapturing(true)}
                className="text-primary font-medium hover:underline"
              >
                Take Selfie
              </button>
            </div>
          )}
        </div>

        {/* Location Section */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className={location ? "text-primary" : "text-slate-400"} />
            <span className="text-sm font-medium">
              {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Location not captured"}
            </span>
          </div>
          <button
            onClick={getLocation}
            className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-md hover:bg-slate-50 transition-colors"
          >
            {location ? "Refresh" : "Get GPS"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={status === "loading"}
            onClick={() => handleSubmit("check-in")}
            className="bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Check In"}
          </button>
          <button
            disabled={status === "loading"}
            onClick={() => handleSubmit("check-out")}
            className="bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Check Out"}
          </button>
        </div>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary font-medium text-sm"
          >
            Attendance marked successfully!
          </motion.p>
        )}
      </div>
    </div>
  );
}
