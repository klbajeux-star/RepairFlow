
import sys

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize line endings to LF for easier manipulation
content = content.replace('\r\n', '\n')

marker = """                      ) : null}
                    </div>
                  </div>"""

insertion = """
                  <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Actions de gestion
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => archiveRepair(selectedRepair.id)}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-slate-200 hover:bg-slate-50"
                      >
                        <Archive className="h-4 w-4" />
                        Archiver le ticket
                      </button>
                      <button
                        onClick={() => deleteRepair(selectedRepair.id)}
                        className="flex items-center gap-3 rounded-2xl border border-rose-50 bg-rose-50/50 px-4 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer définitivement
                      </button>
                    </div>
                  </div>"""

if marker in content:
    content = content.replace(marker, marker + insertion, 1)
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        # Use CRLF since it's Windows
        f.write(content.replace('\n', '\r\n'))
    print("Successfully restored the section.")
else:
    print("Marker not found.")
