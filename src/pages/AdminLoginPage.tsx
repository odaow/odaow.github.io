import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from "../context/authConfig";
import SeoHead from "../components/SeoHead";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const success = await login(formState.username, formState.password);
    setLoading(false);
    if (success) {
      navigate("/admin", { replace: true });
    } else {
      setError("بيانات الدخول غير صحيحة. الرجاء المحاولة مرة أخرى.");
    }
  };

  if (isAuthenticated) {
    navigate("/admin", { replace: true });
  }

  return (
    <div className="bg-slate-50">
      <SeoHead title="لوحة التحكم | مكتب النبراس الهندسي" description="تسجيل الدخول للوحة التحكم" />
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h1 className="text-center font-title text-2xl text-slate-900">تسجيل الدخول</h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            أدخل بيانات الدخول للوصول إلى لوحة التحكم بالمحتوى.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                value={formState.username}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, username: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                value={formState.password}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, password: event.target.value }))
                }
              />
            </div>
            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "جاري التحقق..." : "دخول"}
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-slate-100 p-4 text-xs text-slate-500">
            <p className="font-semibold">بيانات الدخول الافتراضية</p>
            <p>البريد: {DEFAULT_USERNAME}</p>
            <p>كلمة المرور: {DEFAULT_PASSWORD}</p>
            <p className="mt-2">
              يمكنك تغيير كلمة المرور لاحقاً من الكود عن طريق تحديث القيم في ملف
              <code className="mx-1 rounded bg-white px-1 py-0.5 text-[11px] text-slate-700">
                src/context/AuthContext.tsx
              </code>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdminLoginPage;

