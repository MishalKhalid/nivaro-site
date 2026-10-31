import { promises as fs } from "fs";
import path from "path";
import type { WaitlistData } from "./waitlist-schema";

export type WaitlistEntry = Omit<WaitlistData, "company" | "consent" | "startedAt"> & {
  id: string;
  createdAt: string;
};

export interface WaitlistStorage {
  add(entry: WaitlistEntry): Promise<void>;
}

/**
 * Local JSON file storage, for development only.
 * NOTE: local files do not persist on Vercel (read-only / ephemeral filesystem).
 * Switch WAITLIST_STORAGE to "supabase" or "sheets" before deploying.
 */
const localJsonStorage: WaitlistStorage = {
  async add(entry) {
    const file = path.join(process.cwd(), "data", "waitlist.json");
    await fs.mkdir(path.dirname(file), { recursive: true });
    let entries: WaitlistEntry[] = [];
    try {
      entries = JSON.parse(await fs.readFile(file, "utf8")) as WaitlistEntry[];
    } catch {
      entries = [];
    }
    if (entry.source === "waitlist" && entries.some((e) => e.email === entry.email && e.source === "waitlist")) return;
    entries.push(entry);
    await fs.writeFile(file, JSON.stringify(entries, null, 2), "utf8");
  },
};

// TODO(supabase): implement with @supabase/supabase-js.
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
// await supabase.from("waitlist").upsert(entry, { onConflict: "email" });
const supabaseStorage: WaitlistStorage = {
  async add() {
    throw new Error("Supabase storage adapter not implemented yet. See README → Waitlist storage.");
  },
};

// TODO(sheets): implement with the Google Sheets API (spreadsheets.values.append)
// using a service account (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_KEY / GOOGLE_SHEETS_ID).
const sheetsStorage: WaitlistStorage = {
  async add() {
    throw new Error("Google Sheets storage adapter not implemented yet. See README → Waitlist storage.");
  },
};

/** The one place to swap storage. */
export function getWaitlistStorage(): WaitlistStorage {
  switch (process.env.WAITLIST_STORAGE) {
    case "supabase":
      return supabaseStorage;
    case "sheets":
      return sheetsStorage;
    default:
      return localJsonStorage;
  }
}
