export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="bg-zinc-800 text-zinc-100 px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors">
            {children}
        </button>
    );
}