import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import Razorpay from "razorpay";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Clients (Lazy Initialization) ---

let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

let razorpayClient: any = null;
function getRazorpay() {
  if (!razorpayClient) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are required");
    }
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayClient;
}

// --- API Routes ---

// Auth: Login
app.post("/api/auth/login", async (req, res) => {
  const { mobile, pin } = req.body;
  
  try {
    const supabase = getSupabase();
    const { data: user, error } = await supabase
      .from("users")
      .select("*, companies(*)")
      .eq("mobile", mobile)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid PIN" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Attendance: Mark
app.post("/api/attendance", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const { type, selfie_url, lat, lng } = req.body;

    const supabase = getSupabase();
    const { data, error } = await supabase.from("attendance").insert({
      employee_id: decoded.id,
      company_id: decoded.company_id,
      type, // 'check-in' or 'check-out'
      selfie_url,
      latitude: lat,
      longitude: lng,
      timestamp: new Date().toISOString(),
    });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(401).json({ error: err.message || "Invalid token" });
  }
});

// Payments: Create Order
app.post("/api/payments/create-order", async (req, res) => {
  const { planId } = req.body;
  // Plan logic: 6 months or Yearly
  const amount = planId === "yearly" ? 500000 : 300000; // in paise

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Payment creation failed" });
  }
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Attendora Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
