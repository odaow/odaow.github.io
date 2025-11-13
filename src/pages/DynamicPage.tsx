import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

import SeoHead from "../components/SeoHead";
import { useSiteSettings } from "../context/SiteSettingsContext";
import apiClient from "../lib/apiClient";
import type { Page } from "../types/api";

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pages } = useSiteSettings();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!slug) {
      setError("لم يتم تحديد الصفحة المطلوبة.");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    const existing = pages.find((item) => item.slug === slug);
    if (existing) {
      setPage(existing);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    const fetchPage = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<{ page: Page }>(`/api/pages/slug/${slug}`);
        if (!active) return;
        setPage(response.page);
        setError(null);
      } catch {
        if (!active) return;
        setError("الصفحة غير متاحة أو لم يتم نشرها بعد.");
        setPage(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchPage();

    return () => {
      active = false;
    };
  }, [pages, slug]);

  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(page?.content ?? "", { USE_PROFILES: { html: true } }),
    [page?.content],
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">جاري تحميل الصفحة...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <SeoHead title="الصفحة غير متاحة" description="تعذر الوصول إلى الصفحة المطلوبة" />
        <h1 className="text-2xl font-bold text-slate-800">الصفحة غير متاحة</h1>
        <p className="mt-3 max-w-lg text-sm text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16">
      <SeoHead title={page.title} description={page.excerpt ?? page.title} />
      <div className="mx-auto w-full max-w-4xl px-4">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{page.title}</h1>
        {page.excerpt && <p className="mt-3 text-base text-slate-600">{page.excerpt}</p>}
        <article
          className="prose prose-slate mt-8 max-w-none leading-relaxed prose-headings:font-semibold prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        {page.updatedAt && (
          <p className="mt-12 text-xs text-slate-400">
            آخر تحديث: {new Date(page.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicPage;

