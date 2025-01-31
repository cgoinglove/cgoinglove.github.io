export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="my-12 px-8 sm:px-20 w-full mx-auto absolute left-0 bottom-0">
      <p className="text-sm  text-right">
        © {year} Cgoing. All rights reserved.
      </p>
    </footer>
  );
}
