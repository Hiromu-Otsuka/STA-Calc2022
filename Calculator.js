var Ary = [
    [
        {Char:"(",Btn:"(",Type:"Bracketes"},
        {Char:")",Btn:")",Type:"Bracketes"},
        {Char:"^",Btn:"$$x^n$$",Type:"Operator"},
        {Char:"",Btn:"C/AC",Type:"Delete"}
    ],
    [
        {Char:"7",Btn:"7",Type:"Number"},
        {Char:"8",Btn:"8",Type:"Number"},
        {Char:"9",Btn:"9",Type:"Number"},
        {Char:"/",Btn:"÷",Type:"Operator"}
    ],
    [
        {Char:"4",Btn:"4",Type:"Number"},
        {Char:"5",Btn:"5",Type:"Number"},
        {Char:"6",Btn:"6",Type:"Number"},
        {Char:"*",Btn:"×",Type:"Operator"}
    ],
    [
        {Char:"1",Btn:"1",Type:"Number"},
        {Char:"2",Btn:"2",Type:"Number"},
        {Char:"3",Btn:"3",Type:"Number"},
        {Char:"-",Btn:"-",Type:"Operator"}
    ],
    [
        {Char:"0",Btn:"0",Type:"Number"},
        {Char:".",Btn:".",Type:"Point"},
        {Char:"=",Btn:"=",Type:"Equal"},
        {Char:"+",Btn:"+",Type:"Operator"}
    ],
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
                Column.insertAdjacentHTML("beforeend", Ary[i][j].Btn);
                Column.setAttribute("onclick", "TypeBotton(" + i + "," + j + ")");
                if (Ary[i][j].Type == "Number") {
                    Column.setAttribute("class", "cell number");
                } else if (Ary[i][j].Type == "Delete") {
                    Column.setAttribute("class", "cell delete");
                    Column.setAttribute("ondblclick", "AllClear()");
                } else if (Ary[i][j].Type == "Equal") {
                    Column.setAttribute("class", "cell equal");
                } else if (Ary[i][j].Type == "Point") {
                    Column.setAttribute("class", "cell point");
                }else {
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
    var CurrentType = Ary[x][y].Type;
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
        GetText2.textContent += Ary[x][y].Char;
    }
}

function AllClear() {
    document.getElementById("Text1").textContent = "";
    document.getElementById("Text2").textContent = "";
}