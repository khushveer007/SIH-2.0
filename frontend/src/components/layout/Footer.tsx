export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800/80 text-sm mt-12">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-400">© {new Date().getFullYear()} Pathfinder. All rights reserved.</p>
        <div className="flex gap-4 text-neutral-400">
          <a className="hover:text-neutral-200 transition-colors" href="#privacy">Privacy</a>
          <a className="hover:text-neutral-200 transition-colors" href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};
