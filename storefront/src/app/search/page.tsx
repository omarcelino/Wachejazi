import { Suspense } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import SearchPageContent from "@/components/SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>

        <div className="mt-6">
          <Suspense fallback={null}>
            <SearchPageContent />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
