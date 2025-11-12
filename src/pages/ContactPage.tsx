import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import SeoHead from "../components/SeoHead";

type ContactItem = {
  type: "phone" | "email";
  value: string;
};

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const isRTL = i18n.dir(resolvedLanguage) === "rtl";

  const contactItems = t("contact.contactItems", {
    returnObjects: true,
  }) as ContactItem[];

  const officeLines = t("contact.officeLines", {
    returnObjects: true,
  }) as string[];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <SeoHead
        title={`${t("meta.title")} | ${t("nav.contact")}`}
        description={t("contact.heroSubtitle")}
      />
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1529429617124-aee0a93d72cc?auto=format&fit=crop&w=1600&q=80"
          alt="Modern architectural space"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/70" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-title text-4xl md:text-5xl"
          >
            {t("contact.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-base text-white/80 md:text-lg"
          >
            {t("contact.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[1.2fr,1fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t("contact.form.name")}
                </label>
                <input
                  required
                  name="name"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t("contact.form.email")}
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("contact.form.phone")}
              </label>
              <input
                name="phone"
                value={formState.phone}
                onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t("contact.form.message")}
              </label>
              <textarea
                required
                name="message"
                value={formState.message}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }))
                }
                rows={6}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-900"
            >
              {t("contact.form.submit")}
            </button>
            {submitted && (
              <p className="rounded-md bg-brand-light/40 px-3 py-2 text-sm font-semibold text-slate-700">
                {t("contact.form.success")}
              </p>
            )}
          </motion.form>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {t("contact.officeInfoTitle")}
              </h3>
              <div className="mt-4 space-y-1 text-sm font-medium text-slate-700">
                {officeLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {t("contact.contactTitle")}
              </h3>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {contactItems.map((item) => (
                  <a
                    key={item.value}
                    href={item.type === "phone" ? `tel:${item.value}` : `mailto:${item.value}`}
                    className="block font-medium text-slate-700 transition hover:text-brand"
                  >
                    {item.value}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <h2 className={`text-center font-title text-3xl text-slate-900 md:text-4xl`}>
            {t("contact.mapTitle")}
          </h2>
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <iframe
              title="Nebras Office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.5558126225054!2d35.372817!3d32.321535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cd7fa635d0f71%3A0x5f96845af0017d19!2sTubas!5e0!3m2!1sen!2sps!4v1731400000000!5m2!1sen!2sps"
              loading="lazy"
              className="h-[450px] w-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

