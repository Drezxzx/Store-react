export default function ButtonsPages({ elementPerpage, setPages, page }) {
    const Buttons = [];
    for (let i = 1; i <= elementPerpage; i++) {
        if (i === page) {
            Buttons.push(
                <button key={i} className="text-xl md:text-2xl p-[0.4rem] w-10 lg:text-2xl  font-semibold bg-black/80 text-white transition hover:bg-black/60 rounded-md " onClick={() => setPages(i)}>{i}</button>
            );
        } else {
            Buttons.push(
                <button key={i} className="text-xl md:text-2xl p-[0.4rem] w-10 lg:text-2xl font-semibold bg-slate-200 transition hover:bg-black/10 rounded-md " onClick={() => setPages(i)}>{i}</button>
            );
        }

    }
    return (
        <div className="flex gap-2">
            {Buttons.map(button => button)}
        </div>
    );
}
