var Ary = [
    [
        ["(", "(", "Bracketes"],
        [")", ")", "Bracketes"],
        ["^", "$$x^n$$", "Operator"],
        ["", "C/AC", "Delete"]
    ],
    [
        ["7", "7", "Number"],
        ["8", "8", "Number"],
        ["9", "9", "Number"],
        ["/", "÷", "Operator"]
    ],
    [
        ["4", "4", "Number"],
        ["5", "5", "Number"],
        ["6", "6", "Number"],
        ["*", "×", "Operator"]
    ],
    [
        ["1", "1", "Number"],
        ["2", "2", "Number"],
        ["3", "3", "Number"],
        ["-", "-", "Operator"]
    ],
    [
        ["0", "0", "Number"],
        [".", ".", "Point"],
        ["=", "=", "Equal"],
        ["+", "+", "Operator"]
    ]
];
var FromString, Text2, Text1 = "";

window.onload = function CreateTable() {
    var Table = document.createElement("table");
    for (var i = -2; i < Ary.length; i++) {
        var Row = document.createElement("tr");
        if (i < 0) {
            var Column = document.createElement("th");
            Column.setAttribute("colspan", Ary[0].length);
            Column.setAttribute("class", "cell display");
            switch (i) {
                case -2:
                    Column.setAttribute("id", "Text1");
                    break;
                case -1:
                    Column.setAttribute("id", "Text2");
                    break;
            }
            Row.appendChild(Column);
        } else {
            for (var j = 0; j < Ary[i].length; j++) {
                var Column = document.createElement("td");
                Column.insertAdjacentHTML("beforeend", Ary[i][j][1]);
                Column.setAttribute("onclick", "TypeBotton(" + i + "," + j + ")");
                if (Ary[i][j][2] == "Number") {
                    Column.setAttribute("class", "cell number");
                } else if (Ary[i][j][2] == "Delete") {
                    Column.setAttribute("class", "cell delete");
                    Column.setAttribute("ondblclick", "AllClear()");
                } else if (Ary[i][j][2] == "Equal") {
                    Column.setAttribute("class", "cell equal");
                } else if (Ary[i][j][2] == "Point") {
                    Column.setAttribute("class", "cell point");
                } else {
                    Column.setAttribute("class", "cell");
                }
                Row.appendChild(Column);
            }
        }
        Table.appendChild(Row);
    }
    document.getElementById("Maintable").appendChild(Table);
}

function TypeBotton(x, y) {
    var GetText1 = document.getElementById("Text1");
    var GetText2 = document.getElementById("Text2");
    Text2 = GetText2.textContent;
    var CurrentType = Ary[x][y][2];
    if (CurrentType == "Equal") {
        FromString = Text2.replace(/×/g, "*");
        FromString = FromString.replace(/÷/g, "/");
        FromString = FromString.replace(/\^/g, "**");
        GetText1.textContent = Text2 + " = ";
        GetText1.textContent += Function("return(" + FromString + ");")();
        GetText2.textContent = "";
    } else if (CurrentType == "Delete") {
        GetText2.textContent = Text2.slice(0, -1);
    } else {
        GetText2.textContent += Ary[x][y][0];
    }
}

function AllClear() {
    document.getElementById("Text1").textContent = "";
    document.getElementById("Text2").textContent = "";
}

addEventListener("keydown", e => {
    var Key = e.key
    var List = [
        ["(", ")", "^", "Delete"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "*"],
        ["1", "2", "3", "-"],
        ["0", ".", "=", "+"]
    ];
    if(Key == "Enter"){
        Key = "=";
    }else if(e.shiftKey == true && Key == "Delete"){
        AllClear();
    }
    List.forEach((row, i) => {
        row.forEach((element, j) => {
            if (element == Key) {
                TypeBotton(i, j)
            }
        })
    });
});