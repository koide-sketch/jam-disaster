// ===================================
// JAM 災害時営業状況
// 営業状態切替
// normal  : 通常営業
// partial : 一部講師休講
// closed  : 全館休講
// ===================================

// ▼ここを書き換えるだけ
setStatus("closed");

// ================================

function setStatus(status) {

    const title = document.getElementById("status-title");
    const message = document.getElementById("status-message");
    const updated = document.getElementById("updated-at");

    if (!title || !message || !updated) {
        console.log("HTMLのIDが見つかりません。");
        return;
    }

    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");

    updated.textContent = `更新日時：${yyyy}/${mm}/${dd} ${hh}:${mi}`;

    switch (status) {

        case "normal":

            title.textContent = "🟢 通常営業";
            title.className = "status normal";

            message.textContent =
                "本日は通常どおり営業しております。";

            break;

        case "partial":

            title.textContent = "🟡 一部講師休講";
            title.className = "status partial";

            message.textContent =
                "一部講師が休講となります。対象の生徒様へ個別にご連絡いたします。";

            break;

        case "closed":

            title.textContent = "🔴 全館休講";
            title.className = "status closed";

            message.textContent =
                "本日は全館休講となります。振替対応につきましては後日ご案内いたします。";

            break;

        default:

            title.textContent = "状態不明";
            title.className = "status";

            message.textContent =
                "営業状態を確認できません。";

    }

}