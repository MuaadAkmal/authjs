import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto p-4 mt-auto">
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          This is not the official MIS website but a mirror ie, a visual skin on
          top of the original EIS website. Please note that we are not
          responsible for any inaccuracies or outdated information present on
          this site. For official content, please visit the original EISN
          website {":]"}, also Make sure to read our{" "}
          <Link className="font-bold" href="/terms-and-conditions">
            terms and conditions
          </Link>
        </p>
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">
        <small>© {new Date().getFullYear()} EIS. All rights reserved.</small>
      </div>
    </footer>
  );
}
