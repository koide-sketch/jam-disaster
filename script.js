// ===================================
// Supabase設定
// ===================================

const SUPABASE_URL = "zzfdhammevskofaqyrac";
const SUPABASE_ANON_KEY = "ap-northeast-1";

const TABLE_NAME = "disaster_status";
const RECORD_ID = 1;

// ===================================
// Supabase準備
// ===================================

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// ===================================
// ページ読み込み時
// ===================================

loadStatus();

// ===================================
// Supabaseから営業状態を取得
// ===================================

async function loadStatus() {
    const { data, error } = await supabaseClient
        .from(TABLE_NAME)
        .select("*")
        .eq("id", RECORD_ID)
        .single();

    if (error) {
        console.log("読み込みエラー:", error);
        return;
    }

    setStatus(data.status, data.message, data.updated_at);
}

// ===================================
// 管理画面から営業状態を更新
// ===================================

async function updateStatus(status) {

    const messages = {
        normal: "本日は通常どおり営業しております。",
        partial: "一部レッスンが休講となります。対象の生徒様へ個別にご連絡いたします。",
        closed: "本日は休校となります。振替対応につきましては後日ご案内いたします。"
    };

    const { error } = await supabaseClient
        .from(TABLE_NAME)
        .update({
            status: status,
            message: messages[status],
            updated_at: new Date().toISOString()
        })
        .eq("id", RECORD_ID);

    if (error) {
        console.log("更新エラー:", error);
        alert("更新に失敗しました。");
        return;
    }

    await loadStatus();
    alert("更新しました。");
}

// ===================================
// 画面表示を変更
// ===================================

function setStatus(status, message, updatedAt) {

    const title = document.getElementById("status-title");
    const messageArea = document.getElementById("status-message");
    const updated = document.getElementById("updated-at");

    if (!title || !messageArea || !updated) {
        return;
    }

    switch (status) {

        case "normal":
            title.textContent = "🟢 通常営業";
            title.className = "status normal";
            break;

        case "partial":
            title.textContent = "🟡 一部休講";
            title.className = "status partial";
            break;

        case "closed":
            title.textContent = "🔴 休校";
            title.className = "status closed";
            break;

        default:
            title.textContent = "状態不明";
            title.className = "status";
    }

    messageArea.textContent = message;

    if (updatedAt) {
        const date = new Date(updatedAt);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const mi = String(date.getMinutes()).padStart(2, "0");

        updated.textContent = `更新日時：${yyyy}/${mm}/${dd} ${hh}:${mi}`;
    }
}