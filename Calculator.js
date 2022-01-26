var Char = [["(", ")", "^", "C/AC"],
["7", "8", "9", "÷"],
["4", "5", "6", "×"],
["1", "2", "3", "-"],
["0", ".", "=", "+"]];
var Type = [["OpenBracketes", "CloseBracketes", "Symbol", "Delete"],
["Number", "Number", "Number", "Symbol"],
["Number", "Number", "Number", "Symbol"],
["Number", "Number", "Number", "Symbol"],
["Number", "Point", "Equal", "Symbol"]];
var n = 0;
var FromString, Text2, Text1 = "";

function CreateTable() {
    var Table = document.createElement("table");
    for (var i = -2; i < Char.length; i++) {
        var Row = document.createElement("tr");
        if (i < 0) {
            var Column = document.createElement("th");
            Column.setAttribute("colspan", Char[0].length);
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
            for (var j = 0; j < Char[0].length; j++) {
                var Column = document.createElement("td");
                Column.textContent = Char[i][j];
                Column.setAttribute("id", "Button" + i + "-" + j);
                Column.setAttribute("onclick", "TypeBotton(" + i + "," + j + ")");
                Column.setAttribute("ondblclick", "AllClear()");
                if (Type[i][j] == "Number") {
                    Column.setAttribute("class", "cell number");
                } else if (Type[i][j] == "Delete") {
                    Column.setAttribute("class", "cell delete");
                } else if (Type[i][j] == "Equal") {
                    Column.setAttribute("class", "cell equal");
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
    var CurrentType = Type[x][y];
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
        GetText2.textContent += Char[x][y];
    }
}

function AllClear(){
    document.getElementById("Text1").textContent = "";
    document.getElementById("Text2").textContent = "";
}