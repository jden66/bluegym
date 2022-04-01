import styles from "../styles/Home.module.css";
import PageHeader from "../components/pageHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader title="Home" />
      <main className={styles.main}>
        <Link href="/api/auth/google">google login</Link>
        <h1 className={styles.title}>Preparing Home</h1>
      </main>
      {/* 
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
