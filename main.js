function generatePairs(people) {
    const pairs = [];
    for (let i = 0; i < people.length; i++) {
        for (let j = i + 1; j < people.length; j++) {
            pairs.push([people[i], people[j]]);
        }
    }
    return pairs;
}

// 指定された日付に基づきペアを取得
function getDayPairs(people, day, days = 5) {
    const allPairs = generatePairs(people);
    const schedule = [];
    let remainingPairs = [...allPairs];

    // 初期シャッフル (再現性のために、シャッフルする順番は固定)
    remainingPairs = shuffle(remainingPairs, 12345);

    // 指定した日付のペアを取得
    for (let i = 0; i < day; i++) {
        const dayPairs = [];
        
        // 3つのペアを選ぶ（1日に3ペア）
        for (let i = 0; i < remainingPairs.length; i++) {
            if (!dayPairs.some(pair => pair.includes(remainingPairs[i][0]) || pair.includes(remainingPairs[i][1]))) {
                dayPairs.push(remainingPairs[i]);
            }

            if (dayPairs.length === 3) break;
        }

        schedule.push(dayPairs);

        // 選ばれたペアをリストから削除
        remainingPairs = remainingPairs.filter(pair => !dayPairs.includes(pair));
    }

    return schedule[day - 1];  // 引数で渡された日付のペアだけを返す
}

// Fisher-Yates シャッフル
function shuffle(array, seed) {
    let currentIndex = array.length, randomIndex, temporaryValue;
    seed = seed || 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(seed % currentIndex);
        seed = (seed * 37 + 1) % 1000; // 固定の擬似乱数生成
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 2桁表示
    const day = String(today.getDate()).padStart(2, '0'); // 2桁表示
    return `${year}-${month}-${day}`;
}

$(function() {
    if(new Date("2025-02-08") < new Date(getTodayDate()))$("#dateinput").val(getTodayDate())
    const liparent = $("#parent li");
    const lichild = $("#child li")
    member = ["imo1","imo2","eringi","toriten","curry","yoshio"]
    $("#dateinput").on("input",function(){
        inputChange();
    })
    inputChange()

    function inputChange(){
        base = new Date("2025-02-08")
        inputdate = new Date($("#dateinput").val())
        if (inputdate < new Date("2025-02-08") || inputdate > new Date("2025-02-12")){
            alert("対象範囲外");
            $("#dateinput").val(getTodayDate())
        }
        day = ((inputdate - base) / (60*60*24*1000)) + 1
        pairs = getDayPairs(member,day)
        for(let i = 0;i<3;i++){
            pair = pairs[i]
            liparent.eq(i).text(pair[0])
            lichild.eq(i).text(pair[1])
        }
    }
});