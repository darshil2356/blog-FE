// components/Layout.tsx
import React, { PropsWithChildren } from "react";
import styles from "../styles/Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

export default function Layout({ children }: PropsWithChildren<object>) {
  const router = useRouter();

  // Get route segments (remove query params, hash, etc.)
  const pathWithoutQuery = router.asPath.split("?")[0].split("#")[0];
  const segments = pathWithoutQuery.split("/").filter(Boolean);

  // Build breadcrumb paths
  const breadcrumbItems = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      label: decodeURIComponent(seg).replace(/-/g, " "),
      href,
    };
  });

  return (
    <>
      {/* Breadcrumb */}
      {segments.length > 0 && (
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {breadcrumbItems.map((item, idx) => (
              <li key={idx}>
                {idx < breadcrumbItems.length - 1 ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main>{children}</main>

      {/* <footer className={styles.footer}>
        <div className="container">
          <small>© {new Date().getFullYear()} MyBlog • Built with care</small>
        </div>
      </footer> */}
    </>
  );
}
