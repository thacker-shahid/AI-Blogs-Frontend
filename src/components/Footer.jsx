export default function Footer() {
  return (
    <>
      <footer className="bg-white shadow mt-8 dark:bg-gray-950">
        <div className="w-full mx-auto max-w-screen-xl p-4 sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              TrendinGlobes™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
